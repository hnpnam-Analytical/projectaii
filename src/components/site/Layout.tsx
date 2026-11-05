import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header, NAV } from "./Navigation";
export { NAV } from "./Navigation";

const PAGE_ORDER = ["/boi-canh", "/san-pham", "/kpi", "/he-thong", "/du-lieu", "/mo-hinh", "/dashboard"];
const ITEMS = NAV.flatMap((group) => group.items);

function PageNavigation() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const index = PAGE_ORDER.indexOf(path);
  if (index < 0) return null;
  const previous = ITEMS.find((item) => item.to === PAGE_ORDER[index - 1]);
  const next = ITEMS.find((item) => item.to === PAGE_ORDER[index + 1]);
  return <nav aria-label="Điều hướng trang" className="container-page grid grid-cols-2 gap-4 pb-12 pt-4 md:pb-20">
    {previous ? <Link to={previous.to} className="flex min-w-0 items-center gap-3 border-t border-border py-5 text-primary transition-colors hover:text-secondary"><ArrowLeft className="size-5 shrink-0" /><span className="min-w-0"><span className="block text-xs text-muted-foreground">Trang trước</span><span className="mt-1 block text-sm font-semibold">{previous.label}</span></span></Link> : <span />}
    {next ? <Link to={next.to} className="flex min-w-0 items-center justify-end gap-3 border-t border-border py-5 text-right text-primary transition-colors hover:text-secondary"><span className="min-w-0"><span className="block text-xs text-muted-foreground">Trang sau</span><span className="mt-1 block text-sm font-semibold">{next.label}</span></span><ArrowRight className="size-5 shrink-0" /></Link> : <span />}
  </nav>;
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page border-b border-primary-foreground/15 py-8">
        <p className="text-lg font-semibold">SmartBites AI Platform</p>
        <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-inverse-muted">Dự án AI dự báo nhu cầu, cảnh báo công suất và giả lập giá cho mô hình bếp trung tâm của Fitfood Vietnam.</p>
      </div>
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        {NAV.filter((group) => group.label !== "Demo").map((group) => <div key={group.label}>
          <p className="text-sm font-semibold">{group.label}</p>
          <ul className="mt-4 space-y-2">{group.items.map((item) => <li key={item.to}><Link to={item.to} className="inline-flex min-h-11 items-center text-sm text-inverse-muted transition-colors hover:text-primary-foreground">{item.label}</Link></li>)}</ul>
        </div>)}
        <div><p className="text-sm font-semibold">Nguồn</p><p className="mt-4 text-sm leading-relaxed text-inverse-muted">Nội dung tổng hợp từ Báo cáo tiến độ lần 1 và lần 2 của nhóm dự án. Dữ liệu: Kaggle Food Demand Forecasting Dataset.</p></div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="page-enter min-w-0 flex-1 pt-20">{children}<PageNavigation /></main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, toc }: { eyebrow: string; title: string; intro: ReactNode; toc?: { id: string; label: string }[] }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const group = NAV.find((entry) => entry.items.some((item) => item.to === path));
  const item = group?.items.find((entry) => entry.to === path);
  return (
    <div className="border-b border-border bg-muted">
      <div className="container-page py-12 md:py-20">
        <nav aria-label="Đường dẫn trang" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" aria-label="Trang chủ" className="inline-flex size-6 items-center justify-center text-secondary"><Home className="size-3.5" /></Link><ChevronRight className="size-3" />
          <span>{group?.label}</span><ChevronRight className="size-3" /><span aria-current="page" className="font-medium text-primary">{item?.label}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[32px] font-bold md:text-5xl">{title}</h1>
        <div className="prose-body mt-4 text-muted-foreground">{intro}</div>
        {toc && (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Mục lục">
            {toc.map((t) => (
              <Button key={t.id} asChild variant="outline" size="sm" className="border-border bg-background"><a href={`#${t.id}`}>{t.label}</a></Button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export function Section({ id, num, title, lead, children, alt }: { id: string; num?: string; title: string; lead?: ReactNode; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={alt ? "bg-muted" : ""}>
      <div className="container-page content-section">
        <div className="section-grid grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <div>
            {num && <p className="font-mono text-xs text-secondary">{num}</p>}
            <h2 className="mt-2 text-[32px] font-semibold">{title}</h2>
          </div>
          <div className="min-w-0">
            {lead && <div className="prose-body mb-8">{lead}</div>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="figure-frame overflow-hidden rounded-2xl border border-border bg-background">
      <a href={src} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} loading="lazy" className="w-full" />
      </a>
      <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

export function DataTable({ head, rows, caption, highlight }: { head: string[]; rows: ReactNode[][]; caption?: string; highlight?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-primary text-primary-foreground">
            <tr>{head.map((h) => <th key={h} className="min-w-24 px-4 py-4 text-left text-xs font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={`border-t border-border align-top ${i === highlight ? "bg-secondary/10" : i % 2 ? "bg-muted" : "bg-background"}`}>
                {r.map((c, j) => <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-primary" : ""}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className="border-t border-border bg-background px-4 py-2.5 text-xs text-muted-foreground">{caption}</p>}
    </div>
  );
}

export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="border-l-2 border-secondary/30 pl-4">
      <p className="text-2xl font-semibold tabular-nums text-primary md:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{label}</p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border border-l-4 border-l-secondary bg-muted p-6">
      <p className="text-sm font-semibold text-primary">{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

export function NextPage({ to, label }: { to: string; label: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (PAGE_ORDER.includes(path)) return null;
  return (
    <div className="container-page">
      <Link to={to} className="group flex items-center justify-between rounded-md border border-border p-6 hover:border-secondary">
        <span>
          <span className="eyebrow">Tiếp theo</span>
          <span className="mt-1 block text-lg font-semibold text-primary">{label}</span>
        </span>
        <span className="text-xl text-secondary transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} · SmartBites AI` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} · SmartBites AI` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
