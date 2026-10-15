import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, NextPage } from "@/components/site/Layout";

export const Route = createFileRoute("/he-thong")({
  head: () => meta("Kiến trúc hệ thống & luồng dữ liệu", "Năm tầng kiến trúc SmartBites AI và data pipeline từ dữ liệu thô đến dashboard vận hành."),
  component: Page,
});

const LAYERS = [
  ["Data Source", "Kaggle Food Demand Forecasting Dataset", "Đơn hàng, món ăn, giá bán, khuyến mãi và thông tin trung tâm vận hành.", "CSV"],
  ["Data Processing", "Data Cleaning → Data Integration → Feature Engineering", "Làm sạch, chuẩn hóa, tích hợp nhiều nguồn và xây dựng biến đầu vào.", "Python · Pandas · NumPy"],
  ["AI Engine", "Demand Forecasting | Risk Detection | Pricing & Promotion Analysis", "Dự báo đơn hàng, nhận diện rủi ro vận hành, phân tích tác động giá và khuyến mãi.", "XGBoost · Machine Learning"],
  ["Business Intelligence", "KPI | Forecast Results | Alerts | Recommendations", "Chuyển kết quả mô hình thành chỉ số, cảnh báo và đề xuất hỗ trợ quyết định.", ""],
  ["Streamlit Dashboard", "Control Tower | Demand Forecast | Alert Center | Pricing & Marketing", "Trực quan hóa tương tác cho nhà quản lý.", "Streamlit"],
];

const FLOW = [
  ["6.2", "Data Ingestion", "Tiếp nhận ba tệp gốc: train.csv, meal_info.csv, fulfilment_center_info.csv."],
  ["6.3", "Data Integration", "Hợp nhất thành một tập thống nhất qua khóa center_id và meal_id."],
  ["6.4", "Data Quality Assurance", "Kiểm tra tính đầy đủ, nhất quán: missing, duplicate, kiểu dữ liệu."],
  ["6.5", "Feature Engineering", "Chuẩn hóa và xây dựng Feature Set làm đầu vào cho huấn luyện và dự báo."],
  ["6.6", "Model Training & Forecasting", "Huấn luyện mô hình trên Feature Set và sinh dự báo nhu cầu."],
  ["6.7", "Operational Application", "Trình bày dự báo trên Dashboard để lập kế hoạch thu mua, nhân sự, giá."],
  ["6.8", "Feedback Loop", "Đối chiếu đơn thực tế với dự báo; dữ liệu mới dùng để đánh giá và cập nhật mô hình."],
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="04 · System"
        title="Kiến trúc hệ thống và luồng dữ liệu"
        intro="Hệ thống tổ chức thành năm tầng tuần tự và một data pipeline gồm ba nhóm giai đoạn: đầu vào, xử lý và đầu ra."
        toc={[{ id: "kien-truc", label: "Kiến trúc 5 tầng" }, { id: "pipeline", label: "Data pipeline" }]}
      />
      <Section id="kien-truc" num="5" title="Kiến trúc 5 tầng">
        <ol className="space-y-3">
          {LAYERS.map(([n, sub, d, tech], i) => (
            <li key={n} className="grid gap-4 rounded-md border border-border p-5 md:grid-cols-[3rem_1fr_12rem]">
              <span className="grid h-10 w-10 place-items-center rounded bg-primary font-mono text-sm text-primary-foreground">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{n} Layer</h3>
                <p className="mt-1 font-mono text-xs text-secondary">{sub}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
              {tech && <p className="self-center text-xs font-medium text-primary md:text-right">{tech}</p>}
            </li>
          ))}
        </ol>
      </Section>
      <Section id="pipeline" num="6" title="Data pipeline" alt lead="Dữ liệu sau khi tiếp nhận trải qua tích hợp, kiểm tra chất lượng, chuẩn hóa, xây dựng đặc trưng và dự báo trước khi trình bày trên Dashboard; vòng phản hồi giúp cập nhật mô hình theo dữ liệu mới.">
        <ol className="relative border-l border-border pl-8">
          {FLOW.map(([n, t, d]) => (
            <li key={n} className="relative pb-7 last:pb-0">
              <span className="absolute -left-[2.4rem] top-1 h-3 w-3 rounded-full border-2 border-secondary bg-background" />
              <p className="font-mono text-xs text-secondary">{n}</p>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </Section>
      <NextPage to="/du-lieu" label="Dữ liệu" />
    </>
  );
}
