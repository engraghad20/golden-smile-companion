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
    <section className="border-b border-border bg-secondary/50">
      <div className="container-x py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-[1.45] font-bold text-balance text-foreground sm:text-4xl md:text-[2.75rem]">
          {title}
        </h1>
        {body ? (
          <p className="mt-6 max-w-2xl text-base leading-[2] text-muted-foreground">{body}</p>
        ) : null}
      </div>
    </section>
  );
}
