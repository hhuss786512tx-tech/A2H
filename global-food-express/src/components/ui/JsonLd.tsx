/** Renders one or more JSON-LD objects. Nulls are skipped. */
export default function JsonLd({ data }: { data: (object | null)[] | object | null }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean) as object[];
  if (!list.length) return null;
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
