import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, DataTable, Figure, NextPage } from "@/components/site/Layout";
import canvas from "@/assets/ai-canvas.jpg.asset.json";
import p1 from "@/assets/persona-kitchen.jpg.asset.json";
import p2 from "@/assets/persona-marketing.jpg.asset.json";
import sh from "@/assets/stakeholder-map.jpg.asset.json";

export const Route = createFileRoute("/san-pham")({
  head: () => meta("Định nghĩa sản phẩm", "Product vision, AI Canvas, persona, stakeholder map và so sánh SmartBites AI với các giải pháp cạnh tranh."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="02 · Product Definition"
        title="SmartBites AI Platform"
        intro="Nền tảng Bảng điều khiển Trợ lý AI phân tích và hỗ trợ ra quyết định vận hành (Decision-Making Intelligence Dashboard) cho chuỗi bếp trung tâm."
        toc={[
          { id: "vision", label: "Product vision" },
          { id: "canvas", label: "AI Canvas" },
          { id: "persona", label: "Persona" },
          { id: "stakeholder", label: "Stakeholder" },
          { id: "doi-thu", label: "So sánh đối thủ" },
        ]}
      />
      <Section id="vision" num="3.1" title="Product vision">
        <DataTable
          head={["Thành tố", "Nội dung"]}
          rows={[
            ["FOR", "Ban Quản lý Vận hành Chuỗi Bếp trung tâm và Bộ phận Tối ưu Doanh thu & Quản trị Giá của Fitfood VN."],
            ["WHO", "Đối mặt áp lực lãng phí nguyên liệu tươi do hạn dùng ngắn, rủi ro quá tải công suất hoặc cháy hàng cục bộ vì lập kế hoạch bằng bảng tính tĩnh và trực giác."],
            ["THE", "SmartBites AI Platform"],
            ["IS A", "Decision-Making Intelligence Dashboard theo thời gian thực."],
            ["THAT", "Tự động dự báo nhu cầu suất ăn từng món theo tuần, phát hiện sớm nguy cơ chạm trần công suất từng trạm và đề xuất mức chiết khấu tối ưu biên lợi nhuận."],
            ["UNLIKE", "Bảng tính tĩnh dựa trên ước lượng cảm tính, hay phần mềm quản trị cồng kềnh thiếu mô-đun học máy chuỗi thời gian."],
            ["OUR PRODUCT", "Tích hợp đồng thời độ co giãn của cầu theo giá, tính mùa vụ và năng lực vận hành thực tế tại từng trạm."],
          ]}
        />
      </Section>
      <Section id="canvas" num="2" title="AI Canvas" alt>
        <Figure src={canvas.url} alt="AI Project Canvas của dự án SmartBites" caption="Hình 1: AI Canvas" />
      </Section>
      <Section id="persona" num="3.2" title="Người dùng mục tiêu">
        <div className="grid gap-6 md:grid-cols-2">
          <Figure src={p1.url} alt="Persona Quản lý bếp trung tâm" caption="Hình 2: Persona Quản lý bếp trung tâm" />
          <Figure src={p2.url} alt="Persona Giám đốc kinh doanh và Marketing" caption="Hình 3: Persona Giám đốc kinh doanh và Marketing" />
        </div>
      </Section>
      <Section id="stakeholder" num="4" title="Stakeholder map" alt>
        <div className="space-y-6">
          <DataTable
            head={["Bên liên quan", "Loại", "Vai trò", "Ảnh hưởng", "Quan tâm"]}
            rows={[
              ["Ban Giám đốc điều hành", "Trực tiếp", "Phê duyệt chủ trương, cấp ngân sách, thẩm định hiệu quả kinh tế.", "Cao", "Cao"],
              ["Quản lý Bếp trung tâm", "Trực tiếp", "Dùng số suất dự báo để điều phối sơ chế, nấu và phân ca.", "Cao", "Cao"],
              ["Trưởng phòng Doanh thu & Marketing", "Trực tiếp", "Dùng mô hình co giãn giá để đặt chiết khấu và món hiển thị trang chủ.", "Cao", "Cao"],
              ["Nhóm Dự án Kỹ thuật AI", "Trực tiếp", "Xây pipeline 145 tuần, huấn luyện mô hình, phát triển Web Dashboard.", "Cao", "Cao"],
              ["Trưởng bộ phận Thu mua", "Trực tiếp", "Chuyển số suất dự báo thành khối lượng nông sản, thịt để phát hành PO.", "Trung bình", "Cao"],
              ["Nhà cung ứng thực phẩm", "Gián tiếp", "Cung ứng rau củ organic, thịt sạch theo cam kết.", "Trung bình", "Trung bình"],
              ["Khách hàng (Subscribers)", "Gián tiếp", "Đánh giá chất lượng bữa ăn, quyết định gia hạn gói theo tuần.", "Thấp", "Cao"],
              ["Nhân viên bếp & đóng gói", "Gián tiếp", "Sơ chế, nấu, đóng hộp theo định ngạch hằng ngày.", "Thấp", "Trung bình"],
            ]}
            caption="Bảng 6: Phân tích các bên liên quan"
          />
          <Figure src={sh.url} alt="Ma trận stakeholder" caption="Hình 4: Ma trận Stakeholder" />
        </div>
      </Section>
      <Section id="doi-thu" num="9" title="So sánh với đối thủ">
        <DataTable
          head={["Nhóm đối thủ", "SmartBites vượt trội", "Cần cải thiện"]}
          rows={[
            ["Phương pháp truyền thống (Excel + cảm tính đầu bếp)", "Dự báo bằng học máy đa biến thay vì trung bình trượt; phân tích tác động phi tuyến của chiết khấu, giá, vị trí hiển thị; cảnh báo sớm trần công suất bằng mã màu, điều phối ca trước 48–72 giờ.", "Cần thiết bị truy cập mạng và kỹ năng web cơ bản; khó thay đổi thói quen ghi chép của đội bếp lâu năm."],
            ["ERP / POS F&B (iPOS, Sapo FnB, Odoo, SAP)", "Chủ động dự báo nhu cầu theo chuỗi thời gian; mô phỏng kịch bản giá và khuyến mãi; triển khai 2–4 tuần, giao diện tập trung.", "Chưa tích hợp kế toán, hóa đơn, bảng lương; phụ thuộc dữ liệu xuất từ hệ thống bán hàng."],
            ["Nền tảng AI ngoại nhập (Blue Yonder, RELEX)", "Chi phí đầu tư và TCO thấp hơn nhiều, phù hợp chuỗi F&B vừa tại Việt Nam.", "—"],
          ]}
          caption="Bảng 12 (trích): so sánh giải pháp Dashboard AI với các nhóm đối thủ"
        />
      </Section>
      <NextPage to="/kpi" label="KPI Tree" />
    </>
  );
}
