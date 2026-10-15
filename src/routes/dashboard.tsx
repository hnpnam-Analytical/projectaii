import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, Figure, DataTable, Callout } from "@/components/site/Layout";
import exec from "@/assets/dash-exec.jpg.asset.json";
import trend from "@/assets/dash-trend.jpg.asset.json";
import cats from "@/assets/dash-categories.jpg.asset.json";
import centers from "@/assets/dash-centers.jpg.asset.json";
import hist from "@/assets/dash-historical.jpg.asset.json";
import risk from "@/assets/dash-risk.jpg.asset.json";
import ptop from "@/assets/dash-pricing-top.jpg.asset.json";
import sim from "@/assets/dash-simulator.jpg.asset.json";
import fo from "@/assets/flow-overview.jpg.asset.json";
import fc from "@/assets/flow-capacity.jpg.asset.json";
import fp from "@/assets/flow-pricing.jpg.asset.json";

export const Route = createFileRoute("/dashboard")({
  head: () => meta("Dashboard & User flow", "Ba màn hình SmartBites AI Dashboard — Executive Overview, Capacity & Forecast, Smart Pricing — và ba luồng người dùng."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="07 · Mockup & User flow"
        title="SmartBites AI Dashboard"
        intro="Bản mockup trên Streamlit với ba màn hình, mỗi màn hình phục vụ một nhóm người dùng và một quyết định cụ thể."
        toc={[
          { id: "executive", label: "Executive Overview" },
          { id: "capacity", label: "Capacity & Forecast" },
          { id: "pricing", label: "Smart Pricing" },
          { id: "flows", label: "User flows" },
        ]}
      />
      <Section id="executive" title="Executive Overview" lead="Trung tâm điều hành tổng quan: bốn thẻ KPI (Net Revenue, tổng đơn, Avg Discount, Active Centers), biểu đồ Revenue & Order Trend theo tuần, Top 5 Categories, phân tán Discount vs Orders (xem meal_id, center_id, checkout_price khi di chuột) và bảng Center Performance với orders_per_area.">
        <div className="grid gap-4 md:grid-cols-2">
          <Figure src={exec.url} alt="Executive Overview" caption="Thẻ KPI tổng quan" />
          <Figure src={trend.url} alt="Revenue & Order Trend" caption="Revenue & Order Trend" />
          <Figure src={cats.url} alt="Top 5 categories và Discount vs Orders" caption="Top 5 Categories · Discount vs Orders" />
          <Figure src={centers.url} alt="Center Performance" caption="Center Performance" />
        </div>
      </Section>
      <Section id="capacity" title="Capacity & Forecast" alt lead="Dự báo nhu cầu và quản trị năng lực vận hành: biểu đồ Historical Demand từ tuần 0 đến tuần lịch sử mới nhất (145) để nhận diện chu kỳ và mùa vụ; bảng Capacity Risk Preview xếp hạng bếp theo orders_per_area và z_score, hiển thị trạng thái như NORMAL hoặc cảnh báo quá tải.">
        <div className="grid gap-4 md:grid-cols-2">
          <Figure src={hist.url} alt="Historical Demand" caption="Historical Demand" />
          <Figure src={risk.url} alt="Capacity Risk Preview" caption="Capacity Risk Preview" />
        </div>
      </Section>
      <Section id="pricing" title="AI Smart Pricing & Promotion" lead="Chọn món, xem Current Price, Base Price và Avg Orders; What-if Pricing Simulator cho phép đặt giá kịch bản, bật Homepage Featured và Email Promotion để tính Estimated Orders và Estimated Revenue.">
        <div className="grid gap-4 md:grid-cols-2">
          <Figure src={ptop.url} alt="Smart Pricing" caption="Giá hiện tại và đơn trung bình" />
          <Figure src={sim.url} alt="What-if Pricing Simulator" caption="What-if Pricing Simulator" />
        </div>
        <div className="mt-6">
          <Callout title="Lưu ý từ báo cáo">Bản hiện tại là mô phỏng; bản hoàn thiện sẽ tích hợp Price Elasticity Model để đề xuất điều chỉnh giá tối ưu.</Callout>
        </div>
      </Section>
      <Section id="flows" title="User flows" alt lead="Ba luồng cho ba nhóm người dùng. Ô vàng là điểm rẽ nhánh, ô xám là bắt đầu/kết thúc, ô đỏ là cờ cảnh báo; ↻ nghĩa là lặp lại.">
        <DataTable
          head={["Flow", "Người dùng", "Output", "Nhánh chính"]}
          rows={[
            ["Executive Insight", "Ban giám đốc điều hành", "Tổng quan dữ liệu lịch sử", "Biến động bất thường → đào sâu từng tuần; so sánh chi nhánh → bảng hiệu suất bếp. Kết thúc: theo dõi hàng tuần hoặc sang Forecast/Pricing."],
            ["Capacity Alert", "Quản lý nguyên liệu & vận hành", "Dự báo và cảnh báo quá tải", "NORMAL → giữ kế hoạch; quá tải → gắn cờ, xem chi tiết bếp, kế hoạch mua nguyên liệu, phân bổ nhân sự, chốt kế hoạch tuần."],
            ["Price Simulation", "Quản lý marketing", "Giả lập giá và khuyến mãi", "Món nhạy giá → chốt khuyến mãi, đăng lên web; không nhạy giá → thử giá, kênh hoặc món khác. Kênh tiếp thị là tùy chọn."],
          ]}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Figure src={fo.url} alt="Executive Insight Flow" caption="Flow 1: Executive Insight" />
          <Figure src={fc.url} alt="Capacity Alert Flow" caption="Flow 2: Capacity Alert" />
          <Figure src={fp.url} alt="Price Simulation Flow" caption="Flow 3: Price Simulation" />
        </div>
        <div className="mt-6">
          <Callout title="Các bước suy luận cần xác nhận">"Xem dự báo tuần tới" (Flow 2), "Ra quyết định chiến lược" và "Đăng lên web bếp ăn" được suy luận từ mục tiêu, chưa phải chức năng có sẵn trên giao diện.</Callout>
        </div>
      </Section>
    </>
  );
}
