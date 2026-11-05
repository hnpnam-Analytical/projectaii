import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, Callout, NextPage } from "@/components/site/Layout";

export const Route = createFileRoute("/kpi")({
  head: () => meta("KPI Tree", "Hệ thống KPI phân rã mục tiêu tối đa hóa lợi nhuận bếp trung tâm thành chiến lược, thủ thuật và chỉ số đo lường."),
  component: Page,
});

const TREE = [
  {
    s: "Chiến lược 1: Tăng trưởng doanh thu",
    t: [
      ["1.1 Đẩy mạnh quảng bá & kích cầu tiếp thị", ["Số lượng đơn hàng thực tế/đơn bán", "Tỷ lệ phủ sóng chương trình truyền thông"]],
      ["1.2 Tối ưu định vị giá & cơ cấu thực đơn", ["Giá trị doanh thu trên mỗi giao dịch", "Cơ cấu sản phẩm và mức giá bán"]],
    ],
  },
  {
    s: "Chiến lược 2: Tối ưu hóa chi phí",
    t: [
      ["2.1 Quản trị ngân sách chiết khấu & khuyến mãi", ["Mức tiền giảm giá trung bình/đơn", "Tỷ lệ giảm giá trên doanh số (%)", "Độ cộng hưởng chiết khấu & truyền thông"]],
      ["2.2 Tối ưu cấu trúc & tải vận hành bếp", ["Quy mô & diện tích vận hành bếp", "Mật độ đơn hàng trên diện tích bếp", "Tải vận hành trong ngày chạy sự kiện"]],
      ["2.3 Dự báo nguyên liệu mùa vụ & lễ", ["Cờ đánh dấu kỳ nghỉ Lễ Tết", "Chu kỳ tuần/quý trong năm", "Sai số dự báo nhu cầu (thừa/thiếu)"]],
    ],
  },
] as const;

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="03 · KPI Tree"
        title="Từ mục tiêu lợi nhuận đến chỉ số đo lường"
        intro="KPI Tree phân rã theo logic Mục tiêu → Chiến lược → Thủ thuật → KPI, đảm bảo mỗi chỉ số gắn trực tiếp với một hoạt động quản trị cụ thể."
      />
      <Section id="cau-truc" num="8.2" title="Cấu trúc KPI Tree">
        <div className="rounded-md bg-primary px-6 py-4 text-center font-semibold text-primary-foreground">
          Mục tiêu: Tối đa hóa lợi nhuận của Bếp Trung Tâm
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {TREE.map((b) => (
            <div key={b.s} className="rounded-md border border-border">
              <h3 className="border-b border-border bg-muted px-5 py-3 font-semibold">{b.s}</h3>
              <div className="divide-y divide-border">
                {b.t.map(([t, k]) => (
                  <div key={t} className="px-5 py-4">
                    <p className="text-sm font-semibold text-secondary">Thủ thuật {t}</p>
                    <ul className="kpi-labels mt-2 space-y-1 text-sm">
                      {k.map((x) => <li key={x} className="flex gap-2"><span className="text-secondary">▪</span>{x}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section id="quan-he" num="8.5" title="Quan hệ KPI và lợi nhuận" alt>
        <div className="space-y-4">
          <Callout title="Nhánh doanh thu">Tiếp thị và tối ưu giá → tăng số đơn và giá trị doanh thu → tăng doanh thu → tác động tích cực đến lợi nhuận.</Callout>
          <Callout title="Nhánh chi phí">Kiểm soát khuyến mãi + tối ưu công suất bếp + dự báo nguyên liệu → giảm chi phí và lãng phí → cải thiện biên lợi nhuận.</Callout>
          <p className="prose-body">Hệ thống theo dõi cả các yếu tố dẫn dắt (driver): khi lợi nhuận biến động, doanh nghiệp có thể truy ngược nguyên nhân qua KPI ở cấp chiến lược và vận hành. Dự báo thừa dẫn đến tồn kho và lãng phí; dự báo thiếu ảnh hưởng khả năng đáp ứng đơn.</p>
        </div>
      </Section>
      <NextPage to="/he-thong" label="Kiến trúc & luồng dữ liệu" />
    </>
  );
}
