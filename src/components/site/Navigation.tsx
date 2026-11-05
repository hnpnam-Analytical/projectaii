import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, Boxes, BriefcaseBusiness, ChevronDown, Database, Goal, Layers3, Menu, Network, ScanLine, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type NavItem = { to: string; label: string; desc: string; icon: LucideIcon };
export const NAV = [
  { label: "Dự án", items: [
    { to: "/boi-canh", label: "Bối cảnh & mục tiêu", desc: "SMART goals, BMC, PESTEL, SWOT, pain points", icon: Goal },
    { to: "/san-pham", label: "Định nghĩa sản phẩm", desc: "Vision, persona, stakeholder, đối thủ", icon: Boxes },
    { to: "/kpi", label: "KPI Tree", desc: "Mục tiêu → chiến lược → thủ thuật → KPI", icon: Network },
    { to: "/quan-tri", label: "Backlog & RACI", desc: "Product Backlog & Ma trận RACI", icon: BriefcaseBusiness },
  ] },
  { label: "Kỹ thuật", items: [
    { to: "/he-thong", label: "Kiến trúc & luồng dữ liệu", desc: "5 tầng hệ thống, data pipeline", icon: Layers3 },
    { to: "/du-lieu", label: "Dữ liệu", desc: "Audit, đặc trưng, hạn chế, quản trị", icon: Database },
    { to: "/mo-hinh", label: "Mô hình dự báo", desc: "Baseline, 5 mô hình, CatBoost + Optuna", icon: ScanLine },
  ] },
  { label: "Demo", items: [
    { to: "/dashboard", label: "Dashboard & User flow", desc: "Executive Overview, Capacity & Forecast, Smart Pricing", icon: BarChart3 },
  ] },
];

export function Brand() {
  return <Link to="/" aria-label="SmartBites AI · Trang chủ" className="flex shrink-0 items-center gap-3">
    <span className="grid size-10 place-items-center rounded-[10px] bg-primary text-base font-bold text-primary-foreground">SB</span>
    <span className="leading-tight"><span className="block text-base font-bold text-primary">SmartBites AI</span><span className="mt-1 block text-[10px] text-muted-foreground sm:text-[11px]">Demand Forecasting · Fitfood VN</span></span>
  </Link>;
}

function ItemContent({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return <><Icon className="mt-1 size-5 shrink-0 text-secondary" /><span className="min-w-0"><span className="block text-sm font-semibold text-primary">{item.label}</span><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.desc}</span></span></>;
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(["Dự án"]);
  useEffect(() => { setOpen(false); }, [path]);
  function toggle(label: string) { setExpanded((prev) => prev.includes(label) ? prev.filter((value) => value !== label) : [...prev, label]); }
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background">
    <div className="container-page flex h-20 items-center justify-between gap-4">
      <Brand />
      <nav aria-label="Chính" className="hidden items-center gap-5 lg:flex">
        <Button asChild variant="ghost" className={`nav-trigger ${path === "/" ? "nav-selected" : ""}`}><Link to="/">Trang chủ</Link></Button>
        {NAV.map((group) => <DropdownMenu key={group.label}>
          <DropdownMenuTrigger asChild><Button variant="ghost" className={`nav-trigger ${group.items.some((item) => item.to === path) ? "nav-selected" : ""}`}>{group.label}<ChevronDown className="size-3.5" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="center" sideOffset={16} className="w-80 rounded-2xl border-border p-2 shadow-elegant">
            {group.items.map((item) => <DropdownMenuItem key={item.to} asChild><Link to={item.to} aria-current={path === item.to ? "page" : undefined} className={`flex items-start gap-3 rounded-lg px-3 py-3 ${path === item.to ? "nav-selected bg-muted" : ""}`}><ItemContent item={item} /></Link></DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>)}
      </nav>
      <Button asChild className="hidden lg:inline-flex"><Link to="/dashboard">Xem demo<ArrowUpRight /></Link></Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Mở menu" className="text-primary lg:hidden"><Menu /></Button></SheetTrigger>
        <SheetContent className="flex w-[min(90vw,400px)] flex-col gap-0 p-5" aria-describedby="mobile-menu-description">
          <SheetTitle className="pr-9 text-primary">SmartBites AI</SheetTitle>
          <SheetDescription id="mobile-menu-description" className="mt-1 text-xs">Demand Forecasting · Fitfood VN</SheetDescription>
          <nav aria-label="Di động" className="mt-8 flex-1 overflow-y-auto">
            <Button asChild variant="ghost" className={`mb-2 w-full justify-start ${path === "/" ? "nav-selected" : ""}`}><Link to="/" onClick={() => setOpen(false)}>Trang chủ</Link></Button>
            {NAV.map((group) => <div key={group.label} className="border-t border-border py-2">
              <Button variant="ghost" className="w-full justify-between text-primary" aria-expanded={expanded.includes(group.label)} aria-controls={`mobile-${group.label}`} onClick={() => toggle(group.label)}>{group.label}<ChevronDown className={`transition-transform ${expanded.includes(group.label) ? "rotate-180" : ""}`} /></Button>
              {expanded.includes(group.label) && <div id={`mobile-${group.label}`} className="space-y-1 py-2">{group.items.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} aria-current={path === item.to ? "page" : undefined} className={`flex min-h-11 items-start gap-3 rounded-lg px-3 py-3 ${path === item.to ? "nav-selected bg-muted" : ""}`}><ItemContent item={item} /></Link>)}</div>}
            </div>)}
          </nav>
          <Button asChild className="mt-4 w-full shrink-0"><Link to="/dashboard" onClick={() => setOpen(false)}>Xem demo<ArrowUpRight /></Link></Button>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}