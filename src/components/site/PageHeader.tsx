export function PageHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="mesh-teal relative overflow-hidden text-background">
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to left, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="container-x relative py-16 sm:py-20">
        <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold">
          <span className="h-px w-6 bg-gold" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-3xl leading-[1.45] font-bold text-balance text-background sm:text-4xl md:text-[2.75rem]">
          {title}
        </h1>
        {body ? (
          <p className="mt-6 max-w-2xl text-base leading-[2] text-background/75">{body}</p>
        ) : null}
      </div>
    </section>
  );
}
