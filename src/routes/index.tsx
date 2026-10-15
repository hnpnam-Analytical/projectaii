import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, Stat, Figure } from "@/components/site/Layout";
import dashExec from "@/assets/dash-exec.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Dự báo nhu cầu cho bếp trung tâm Fitfood",
      "SmartBites AI: nền tảng dự báo nhu cầu suất ăn, cảnh báo quá tải bếp và giả lập giá cho chuỗi bếp trung tâm Fitfood Vietnam.",
    ),
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
      <section className="border-b border-border">
        <div className="container-page grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">Dự án AI · Báo cáo tiến độ lần 1 & 2</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              SmartBites AI: dự báo nhu cầu suất ăn cho mô hình bếp trung tâm
            </h1>
            <p className="prose-body mt-5 text-muted-foreground">
              Nền tảng dashboard hỗ trợ ra quyết định cho Fitfood Vietnam: dự báo số suất ăn theo từng món và từng bếp,
              phát hiện sớm nguy cơ quá tải công suất, và giả lập tác động của giá bán, khuyến mãi lên nhu cầu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/mo-hinh" className="rounded bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                Kết quả mô hình
              </Link>
              <Link to="/dashboard" className="rounded border border-border px-5 py-2.5 text-sm font-medium text-primary hover:border-secondary">
                Xem dashboard
              </Link>
            </div>
          </div>
          <Figure src={dashExec.url} alt="Màn hình Executive Overview của SmartBites AI Dashboard" caption="Executive Overview — SmartBites AI Dashboard (bản demo Streamlit)" />
        </div>
      </section>

      <section className="bg-muted">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="456.548" label="Bản ghi lịch sử" note="145 tuần · 0 missing · 0 duplicate" />
          <Stat value="77 · 51" label="Trung tâm · mã món" note="14 danh mục món ăn" />
          <Stat value="69,48" label="MAE của CatBoost (Optuna)" note="Baseline trung bình: 168,66 suất" />
          <Stat value="−58,8%" label="Sai số so với baseline" note="Tính từ MAE 168,66 → 69,48" />
        </div>
      </section>

      <section>
        <div className="container-page py-16">
          <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
            <div>
              <p className="eyebrow">Bài toán</p>
              <h2 className="mt-2 text-2xl font-semibold">Ba vấn đề cần giải quyết</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
              {[
                ["Lãng phí & thiếu nguyên liệu", "Đơn hàng cùng món biến động mạnh; dự báo trung bình quá khứ sai hàng trăm phần ăn mỗi món/tuần."],
                ["Mất cân đối công suất bếp", "Tổng đơn về một bếp chênh 3–4 lần giữa tuần thấp và cao điểm, gây OT hoặc dư nhân sự."],
                ["Khuyến mãi bào mòn lợi nhuận", "Nhiều món được gửi email quảng bá nhưng đơn tăng không đáng kể do giảm giá dàn trải."],
              ].map(([t, d], i) => (
                <div key={t} className="bg-background p-6">
                  <p className="font-mono text-xs text-secondary">0{i + 1}</p>
                  <h3 className="mt-2 font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-16">
          <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
            <div>
              <p className="eyebrow">Nội dung</p>
              <h2 className="mt-2 text-2xl font-semibold">Khám phá dự án</h2>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {SECTIONS.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5">
                    <span className="font-mono text-sm text-secondary">{s.n}</span>
                    <span>
                      <span className="block font-semibold text-primary">{s.t}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{s.d}</span>
                    </span>
                    <span className="text-secondary transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
