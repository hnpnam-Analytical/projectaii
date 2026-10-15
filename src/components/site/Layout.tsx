import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type NavItem = { to: string; label: string; desc?: string };
type NavGroup = { label: string; items: NavItem[] };

export const NAV: (NavItem | NavGroup)[] = [
  { to: "/", label: "Trang chủ" },
  {
    label: "Dự án",
    items: [
      { to: "/boi-canh", label: "Bối cảnh & mục tiêu", desc: "SMART goals, BMC, PESTEL, SWOT, pain points" },
      { to: "/san-pham", label: "Định nghĩa sản phẩm", desc: "Vision, persona, stakeholder, đối thủ" },
      { to: "/kpi", label: "KPI Tree", desc: "Mục tiêu → chiến lược → thủ thuật → KPI" },
    ],
  },
  {
    label: "Kỹ thuật",
    items: [
      { to: "/he-thong", label: "Kiến trúc & luồng dữ liệu", desc: "5 tầng hệ thống, data pipeline" },
      { to: "/du-lieu", label: "Dữ liệu", desc: "Audit, đặc trưng, hạn chế, quản trị" },
      { to: "/mo-hinh", label: "Mô hình dự báo", desc: "Baseline, 5 mô hình, CatBoost + Optuna" },
    ],
  },
  { to: "/dashboard", label: "Dashboard & User flow" },
];

function isGroup(n: NavItem | NavGroup): n is NavGroup {
  return "items" in n;
}

function Header() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded bg-primary text-sm font-bold text-primary-foreground">
            SB
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-primary">SmartBites AI</span>
            <span className="block text-[11px] text-muted-foreground">Demand Forecasting · Fitfood VN</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Chính">
          {NAV.map((n) =>
            isGroup(n) ? (
              <div key={n.label} className="group relative">
                <button
                  className={`flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    n.items.some((i) => i.to === path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {n.label} <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute left-0 top-full w-80 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-md border border-border bg-popover p-2 shadow-lg">
                    {n.items.map((i) => (
                      <Link
                        key={i.to}
                        to={i.to}
                        className="block rounded px-3 py-2.5 hover:bg-muted"
                        activeProps={{ className: "bg-accent" }}
                      >
                        <span className="block text-sm font-medium text-primary">{i.label}</span>
                        {i.desc && <span className="block text-xs text-muted-foreground">{i.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          to="/mo-hinh"
          className="hidden rounded bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Xem kết quả mô hình
        </Link>

        <button
          className="rounded p-2 text-primary lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Di động">
            {NAV.map((n) =>
              isGroup(n) ? (
                <div key={n.label} className="py-2">
                  <p className="eyebrow px-2 pb-1">{n.label}</p>
                  {n.items.map((i) => (
                    <Link key={i.to} to={i.to} className="block rounded px-2 py-2 text-sm text-foreground" activeProps={{ className: "bg-accent text-primary" }}>
                      {i.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded px-2 py-2 text-sm font-medium text-foreground" activeProps={{ className: "bg-accent text-primary" }}>
                  {n.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-sm font-semibold text-primary">SmartBites AI Platform</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Dự án AI dự báo nhu cầu, cảnh báo công suất và giả lập giá cho mô hình bếp trung tâm của Fitfood Vietnam.
          </p>
        </div>
        {NAV.filter(isGroup).map((g) => (
          <div key={g.label}>
            <p className="eyebrow">{g.label}</p>
            <ul className="mt-3 space-y-2">
              {g.items.map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="text-sm text-muted-foreground hover:text-primary">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="eyebrow">Nguồn</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Nội dung tổng hợp từ Báo cáo tiến độ lần 1 và lần 2 của nhóm dự án. Dữ liệu: Kaggle Food Demand Forecasting Dataset.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, toc }: { eyebrow: string; title: string; intro: ReactNode; toc?: { id: string; label: string }[] }) {
  return (
    <div className="border-b border-border bg-muted">
      <div className="container-page py-12 md:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">{title}</h1>
        <div className="prose-body mt-4 text-muted-foreground">{intro}</div>
        {toc && (
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Mục lục">
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="rounded border border-border bg-background px-3 py-1.5 text-xs font-medium text-primary hover:border-secondary">
                {t.label}
              </a>
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
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <div>
            {num && <p className="font-mono text-xs text-secondary">{num}</p>}
            <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
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
    <figure className="overflow-hidden rounded-md border border-border bg-background">
      <a href={src} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} loading="lazy" className="w-full" />
      </a>
      <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

export function DataTable({ head, rows, caption, highlight }: { head: string[]; rows: ReactNode[][]; caption?: string; highlight?: number }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary text-primary-foreground">
            <tr>{head.map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 text-left font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={`border-t border-border align-top ${i === highlight ? "bg-accent" : i % 2 ? "bg-muted" : "bg-background"}`}>
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
    <div className="border-l-2 border-secondary pl-4">
      <p className="text-2xl font-semibold tabular-nums text-primary md:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{label}</p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-border border-l-4 border-l-secondary bg-accent/40 p-5">
      <p className="text-sm font-semibold text-primary">{title}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

export function NextPage({ to, label }: { to: string; label: string }) {
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
