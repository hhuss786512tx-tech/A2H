"use client";
import { useEffect, useRef } from "react";
import { canRunWebGL } from "@/lib/motion";

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main(){ vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }
`;

// Warm "spice smoke": layered fbm noise tinted saffron and pistachio, plus a cursor light.
const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uMouseStr;
vec3 hash3(vec2 p){ vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash3(i).x,b=hash3(i+vec2(1.,0.)).x,c=hash3(i+vec2(0.,1.)).x,d=hash3(i+vec2(1.,1.)).x;
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.; float a=0.5; mat2 m=mat2(1.6,1.2,-1.2,1.6); for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p; a*=0.5; } return v; }
void main(){
  vec2 uv = vUv; vec2 p = uv; p.x *= uRes.x/uRes.y;
  float t = uTime*0.06;
  vec2 q = vec2(fbm(p+t), fbm(p+vec2(5.2,1.3)-t));
  float f = fbm(p + 2.2*q + vec2(t*0.5, -t*0.3));
  vec3 base = vec3(0.027,0.063,0.047);
  vec3 saffron = vec3(0.914,0.659,0.227);
  vec3 pist = vec3(0.624,0.749,0.557);
  vec3 chili = vec3(0.784,0.227,0.18);
  vec3 col = base;
  col = mix(col, saffron*0.55, smoothstep(0.45,0.95,f)*0.55);
  col = mix(col, pist*0.35, smoothstep(0.3,0.7,q.x)*0.35);
  col = mix(col, chili*0.4, smoothstep(0.75,1.0,f)*0.25);
  // cursor light
  vec2 m = uMouse; m.x *= uRes.x/uRes.y;
  float d = distance(p, m);
  float light = exp(-d*d*4.0) * uMouseStr;
  col += saffron * light * 0.35;
  // vignette
  float vig = smoothstep(1.4, 0.3, distance(uv, vec2(0.5)));
  col *= mix(0.55, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * OGL fullscreen shader behind the hero. Mounts after first paint on pointer devices
 * only; the hero stays complete without it (CSS gradients + image).
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !canRunWebGL()) return;
    let cancelled = false;
    let cleanup = () => {};
    const start = async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");
      if (cancelled) return;
      const renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 1.5) * 0.6, alpha: false, antialias: false, powerPreference: "low-power" });
      const gl = renderer.gl;
      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] }, uMouse: { value: [0.5, 0.5] }, uMouseStr: { value: 0 } },
      });
      const mesh = new Mesh(gl, { geometry, program });
      const resize = () => {
        const w = canvas.clientWidth || window.innerWidth;
        const h = canvas.clientHeight || window.innerHeight;
        renderer.setSize(w, h);
        program.uniforms.uRes.value = [w, h];
      };
      resize();
      window.addEventListener("resize", resize);
      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, s: 0, ts: 0 };
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
        mouse.ts = 1;
      };
      const onLeave = () => (mouse.ts = 0);
      canvas.parentElement?.addEventListener("pointermove", onMove, { passive: true });
      canvas.parentElement?.addEventListener("pointerleave", onLeave);
      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(canvas);
      const t0 = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;
        mouse.s += (mouse.ts - mouse.s) * 0.05;
        program.uniforms.uTime.value = (now - t0) / 1000;
        program.uniforms.uMouse.value = [mouse.x, mouse.y];
        program.uniforms.uMouseStr.value = mouse.s;
        renderer.render({ scene: mesh });
      };
      raf = requestAnimationFrame(loop);
      canvas.style.opacity = "1";
      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", resize);
        canvas.parentElement?.removeEventListener("pointermove", onMove);
        canvas.parentElement?.removeEventListener("pointerleave", onLeave);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };
    const hasIdle = "requestIdleCallback" in window;
    const id = hasIdle ? window.requestIdleCallback(() => start(), { timeout: 2500 }) : window.setTimeout(start, 1200);
    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup();
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1500ms]" aria-hidden="true" />;
}
