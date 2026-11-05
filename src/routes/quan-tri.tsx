import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, DataTable, Callout, NextPage } from "@/components/site/Layout";

export const Route = createFileRoute("/quan-tri")({
  head: () =>
    meta(
      "Product Backlog & RACI",
      "Quản trị dự án SmartBites AI: tổng quan 4 sprint, Product Backlog tiêu biểu và ma trận phân công trách nhiệm RACI của đội ngũ.",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="08 · Project Management"
        title="Product Backlog & Ma trận RACI"
        intro="Danh mục công việc dự án được phân rã theo các chặng phát triển (Sprint) và quản trị tập trung trên công cụ theo dõi tiến độ, đảm bảo 100% hạng mục được nghiệm thu đúng hạn; ma trận RACI định nghĩa rõ vai trò từng thành viên, triệt tiêu chồng chéo chức năng."
        toc={[
          { id: "sprint", label: "Tổng quan Sprint" },
          { id: "backlog", label: "Product Backlog" },
          { id: "raci", label: "Ma trận RACI" },
        ]}
      />

      <Section id="sprint" num="8.1" title="Tổng quan các Sprint">
        <DataTable
          head={["Sprint", "Thời gian", "Mục tiêu", "Số task", "Điểm", "Sản phẩm chính"]}
          rows={[
            ["1", "Tuần 2–3", "Xác định bài toán và sản phẩm", "6", "21", "AI Canvas, Project Charter, Risk Register v1, mockup"],
            ["2", "Tuần 4–5", "Dữ liệu và baseline", "6", "23", "Data Audit, EDA, baseline, Model Selection Matrix"],
            ["3", "Tuần 6–7", "Cải thiện mô hình và đánh giá", "6", "28", "Mô hình tinh chỉnh, ROI, Dashboard, What-if"],
            ["4", "Tuần 8–9", "Hoàn thiện và trình bày", "6", "29", "Prototype, báo cáo cuối kỳ, AI System Card, Roadmap"],
          ]}
          caption="Bảng 1: Tổng quan các sprint của dự án"
        />
      </Section>

      <Section id="backlog" num="8.1" title="Product Backlog tiêu biểu" alt>
        <DataTable
          head={["Mã", "Nhóm công việc", "Hạng mục", "Ưu tiên", "Điểm", "Phụ trách", "Sprint", "Trạng thái"]}
          rows={[
            ["PB-03", "Hiểu bài toán", "Lập Project Charter và KPI Tree", "Must", "3", "Phúc Huy", "1", "Hoàn thành"],
            ["PB-07", "Dữ liệu", "Kiểm toán dữ liệu, lập Data Dictionary", "Must", "5", "Phương Nam", "2", "Hoàn thành"],
            ["PB-08", "Dữ liệu", "EDA, ground truth, kiểm tra rò rỉ dữ liệu", "Must", "5", "Phương Nam", "2", "Hoàn thành"],
            ["PB-10", "Mô hình", "So sánh 5 mô hình, lập Model Selection Matrix", "Must", "5", "Phương Nam", "2", "Hoàn thành"],
            ["PB-13", "Mô hình", "Tinh chỉnh CatBoost, áp dụng Safety Buffer", "Must", "5", "Phương Nam", "3", "Hoàn thành"],
            ["PB-15", "Kinh doanh", "Tính TCO, ROI, điểm hòa vốn, định giá SaaS", "Must", "5", "Phúc Huy", "3", "Hoàn thành"],
            ["PB-17", "Sản phẩm", "Phát triển What-if và cảnh báo quá tải", "Must", "5", "Đăng Nguyên", "3", "Hoàn thành"],
            ["PB-18", "Vận hành", "Thiết lập giám sát Data Drift, kế hoạch triển khai v1", "Should", "3", "Phương Nam, Anh Vũ", "3", "Hoàn thành"],
            ["PB-19", "Vận hành", "Kết nối API KiotViet, kế hoạch Shadow và Pilot", "Should", "5", "Anh Vũ", "4", "Hoàn thành"],
            ["PB-21", "Quản trị", "Hoàn thiện AI System Card, Risk Register, NIST AI RMF Mapping", "Must", "5", "Phúc Huy, Minh Đức", "4", "Hoàn thành"],
          ]}
          caption="Bảng 2: Product Backlog tiêu biểu"
        />
      </Section>

      <Section
        id="raci"
        num="8.2"
        title="Ma trận phân công trách nhiệm (RACI)"
        lead={
          <div className="grid gap-4 md:grid-cols-2">
            <Callout title="R — Responsible (Người thực hiện)">Trực tiếp triển khai và hoàn thành công việc.</Callout>
            <Callout title="A — Accountable (Người chịu trách nhiệm)">Phê duyệt và chịu trách nhiệm cuối cùng về chất lượng đầu ra.</Callout>
            <Callout title="C — Consulted (Người tham vấn)">Đóng góp ý kiến chuyên môn và dữ liệu đầu vào.</Callout>
            <Callout title="I — Informed (Người nhận thông tin)">Được cập nhật tiến độ và kết quả thực hiện.</Callout>
          </div>
        }
      >
        <DataTable
          head={["Hạng mục", "Phúc Huy (Product Owner)", "Minh Đức (Vận hành, SOP)", "Phương Nam (Dữ liệu, AI)", "Đăng Nguyên (Dashboard)", "Anh Vũ (Tích hợp, Pilot)"]}
          rows={[
            ["Bài toán, Project Charter, KPI", "A/R", "C", "C", "I", "I"],
            ["Khảo sát nỗi đau, nguyên nhân gốc, SOP vận hành", "A", "R", "C", "C", "I"],
            ["Data Audit, EDA, kiểm tra rò rỉ dữ liệu", "I", "I", "A/R", "I", "C"],
            ["Huấn luyện, tinh chỉnh mô hình, Safety Buffer, Data Drift", "C", "I", "A/R", "C", "C"],
            ["Đánh giá mô hình (kỹ thuật, kinh doanh, rủi ro)", "R", "C", "A/R", "I", "I"],
            ["TCO, ROI, định giá, Roadmap, GTM", "A/R", "C", "C", "I", "C"],
            ["Dashboard, What-if, cảnh báo quá tải", "C", "C", "C", "A/R", "I"],
            ["Kết nối API KiotViet, Shadow và Pilot, Onboarding", "C", "I", "C", "I", "A/R"],
            ["Risk Register, AI System Card, NIST AI RMF", "A/R", "R", "R", "I", "I"],
            ["Quản lý backlog, sprint, biên bản họp", "A/R", "R", "C", "C", "C"],
            ["Báo cáo cuối kỳ, slide, README, AI Use Disclosure Log", "A/R", "R", "R", "R", "R"],
          ]}
          caption="Bảng 3: Ma trận RACI của đội dự án"
        />
      </Section>

      <NextPage to="/" label="Về trang chủ" />
    </>
  );
}
