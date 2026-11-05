import { createFileRoute, Link } from "@tanstack/react-router";
import { meta } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CircleDollarSign, Factory, PackageX, Users, Workflow } from "lucide-react";
import dashExec from "@/assets/dash-exec.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => {
    const page = meta("Dự báo nhu cầu cho bếp trung tâm Fitfood", "SmartBites AI: nền tảng dự báo nhu cầu suất ăn, cảnh báo quá tải bếp và giả lập giá cho chuỗi bếp trung tâm Fitfood Vietnam.");
    return { meta: [...page.meta, { property: "og:image", content: dashExec.url }, { name: "twitter:image", content: dashExec.url }] };
  },
  component: Index,
});

const SECTIONS = [
  { to: "/boi-canh", n: "01", t: "Bối cảnh & mục tiêu", d: "3 mục tiêu SMART, Business Model Canvas, PESTEL, SWOT, chuỗi giá trị và 3 pain points." },
  { to: "/san-pham", n: "02", t: "Định nghĩa sản phẩm", d: "Product vision, AI Canvas, persona người dùng, stakeholder map và so sánh đối thủ." },
  { to: "/kpi", n: "03", t: "KPI Tree", d: "Phân rã mục tiêu lợi nhuận thành 2 chiến lược, 5 thủ thuật và các KPI đo lường." },
  { to: "/he-thong", n: "04", t: "Kiến trúc & luồng dữ liệu", d: "5 tầng hệ thống từ dữ liệu Kaggle đến Streamlit Dashboard, cùng 8 bước data pipeline." },
  { to: "/du-lieu", n: "05", t: "Dữ liệu", d: "Audit 456.548 dòng, biến đổi Yeo–Johnson, 46 đặc trưng, hạn chế và khung quản trị dữ liệu." },
  { to: "/mo-hinh", n: "06", t: "Mô hình dự báo", d: "Baseline, so sánh 5 mô hình, CatBoost tinh chỉnh bằng Optuna và các hạn chế." },
  { to: "/dashboard", n: "07", t: "Dashboard & User flow", d: "3 màn hình Executive, Capacity & Forecast, Pricing cùng 3 luồng người dùng." },
];

function Index() {
  return (
    <>
      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase text-inverse-muted">Dự án AI · Báo cáo tiến độ lần 1 & 2</p>
              <h1 className="hero-title mt-5 font-bold">SmartBites AI: dự báo nhu cầu suất ăn cho mô hình bếp trung tâm</h1>
              <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-inverse-muted">Nền tảng dashboard hỗ trợ ra quyết định cho Fitfood Vietnam: dự báo số suất ăn theo từng món và từng bếp,
                phát hiện sớm nguy cơ quá tải công suất, và giả lập tác động của giá bán, khuyến mãi lên nhu cầu.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link to="/mo-hinh">Kết quả mô hình<ArrowUpRight /></Link></Button>
                <Button asChild variant="outline" size="lg" className="border-inverse-muted text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/dashboard">Xem dashboard<ArrowUpRight /></Link></Button>
              </div>
            </div>
            <figure className="browser-frame bg-background text-foreground">
              <div aria-hidden="true" className="flex h-11 items-center gap-1.5 border-b border-border bg-muted px-4"><span className="size-2 rounded-full bg-secondary/50" /><span className="size-2 rounded-full bg-secondary/35" /><span className="size-2 rounded-full bg-secondary/20" /><div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded bg-background text-[10px] text-muted-foreground">SmartBites AI</div></div>
              <a href={dashExec.url} target="_blank" rel="noreferrer"><img src={dashExec.url} alt="Màn hình Executive Overview của SmartBites AI Dashboard" className="w-full" /></a>
              <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">Executive Overview — SmartBites AI Dashboard (bản demo Streamlit)</figcaption>
            </figure>
          </div>
          <div className="mt-12 grid gap-8 border-t border-primary-foreground/20 pt-8 md:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2"><p className="text-6xl font-bold tabular-nums text-highlight md:text-7xl">−58,8%</p><div><p className="text-sm font-medium">Sai số so với baseline</p><p className="mt-1 text-xs text-inverse-muted">Tính từ MAE 168,66 → 69,48</p></div></div>
            <div><p className="mb-4 text-xs font-semibold uppercase text-inverse-muted">Quy mô dữ liệu huấn luyện</p><div className="grid gap-6 sm:grid-cols-3">
              {[ ["456.548", "Bản ghi lịch sử", "145 tuần · 0 missing · 0 duplicate"], ["77 · 51", "Trung tâm · mã món", "14 danh mục món ăn"], ["69,48", "MAE của CatBoost (Optuna)", "Baseline trung bình: 168,66 suất"] ].map(([value, label, note]) => <div key={value}><p className="text-2xl font-semibold tabular-nums">{value}</p><p className="mt-1 text-xs font-medium">{label}</p><p className="mt-1 text-xs text-inverse-muted">{note}</p></div>)}
            </div></div>
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="container-page content-section">
          <div className="grid gap-8">
            <div>
              <p className="eyebrow">Bài toán</p>
              <h2 className="mt-2 text-[32px] font-semibold">Ba vấn đề cần giải quyết</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ["Lãng phí & thiếu nguyên liệu", "Đơn hàng cùng món biến động mạnh; dự báo trung bình quá khứ sai hàng trăm phần ăn mỗi món/tuần."],
                ["Mất cân đối công suất bếp", "Tổng đơn về một bếp chênh 3–4 lần giữa tuần thấp và cao điểm, gây OT hoặc dư nhân sự."],
                ["Khuyến mãi bào mòn lợi nhuận", "Nhiều món được gửi email quảng bá nhưng đơn tăng không đáng kể do giảm giá dàn trải."],
              ].map(([t, d], i) => (
                <div key={t} className="enterprise-card p-7">
                  <div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-muted text-secondary">{i === 0 ? <PackageX /> : i === 1 ? <Factory /> : <CircleDollarSign />}</span><p className="text-xs text-secondary">0{i + 1}</p></div>
                  <h3 className="mt-2 font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page content-section">
          <div className="grid gap-8">
            <div>
              <p className="eyebrow">Nội dung</p>
              <h2 className="mt-2 text-[32px] font-semibold">Khám phá dự án</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {[{ title: "Dành cho người ra quyết định", icon: Users, sections: SECTIONS.filter((section) => ["/boi-canh", "/san-pham", "/kpi", "/dashboard"].includes(section.to)) }, { title: "Dành cho đội kỹ thuật", icon: Workflow, sections: SECTIONS.filter((section) => ["/he-thong", "/du-lieu", "/mo-hinh"].includes(section.to)) }].map((group) => <div key={group.title} className="enterprise-card p-6 md:p-8">
                <group.icon className="size-7 text-secondary" /><h3 className="mt-4 font-semibold">{group.title}</h3>
                <ol className="mt-6 divide-y divide-border">{group.sections.map((section) => <li key={section.to}><Link to={section.to} className="group flex min-w-0 items-start gap-3 py-5"><span className="mt-1 text-xs text-secondary">{section.n}</span><span className="min-w-0 flex-1"><span className="block font-semibold text-primary group-hover:text-secondary">{section.t}</span><span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{section.d}</span></span><ArrowUpRight className="mt-1 size-4 shrink-0 text-secondary" /></Link></li>)}</ol>
              </div>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
