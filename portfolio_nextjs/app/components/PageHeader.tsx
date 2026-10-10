import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  icon?: ReactNode;
  level?: 1 | 2;
};

export default function PageHeader({ title, description, eyebrow, icon, level = 1 }: PageHeaderProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <header className="page-header mb-7 text-center sm:mb-10">
      {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Heading className="font-display text-3xl font-bold text-brand sm:text-4xl">{title}</Heading>
        {icon && <span className="page-header__icon" aria-hidden="true">{icon}</span>}
      </div>
      {description && <p className="mx-auto mt-3 max-w-2xl text-lg text-quiet">{description}</p>}
    </header>
  );
}
