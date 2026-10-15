import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, DataTable, NextPage } from "@/components/site/Layout";

export const Route = createFileRoute("/boi-canh")({
  head: () => meta("Bối cảnh & mục tiêu kinh doanh", "Mục tiêu SMART, Business Model, PESTEL, SWOT, chuỗi giá trị và pain points của mô hình bếp trung tâm Fitfood Vietnam."),
  component: Page,
});

const GOALS = [
  {
    t: "Tối ưu chi phí vận hành & quản trị hàng tồn kho",
    rows: [
      ["Specific", "Cắt giảm lãng phí nguyên liệu tươi sống do dự báo sai và hạn chế hết hàng; AI dự báo nhu cầu từng món tại từng bếp."],
      ["Measurable", "Giảm MAE từ 114,58 phần ăn/món/tuần (thủ công) xuống dưới 50. Giảm lãng phí tối thiểu 15%, tỷ lệ mất đơn do hết hàng dưới 5%."],
      ["Achievable", "Dữ liệu 145 tuần chứa chu kỳ thực đơn, giá bán và hoạt động tiếp thị."],
      ["Relevant", "Nguyên liệu healthy có hạn dùng ngắn; giảm sai số trực tiếp cắt giảm COGS."],
      ["Time-bound", "Trong chu kỳ 10 tuần tiếp theo (Tuần 146–155)."],
    ],
  },
  {
    t: "Tối đa hóa biên lợi nhuận & hiệu quả tiếp thị",
    rows: [
      ["Specific", "Tối ưu chiến dịch email và hiển thị trang chủ; tìm điểm giá tối ưu từng danh mục thay vì giảm giá đại trà."],
      ["Measurable", "Tăng Promotion ROI thêm 12%; tăng tổng doanh thu 10 tuần dự báo 8–10% so với kịch bản không tối ưu giá."],
      ["Achievable", "Dữ liệu ghi nhận tương tác giữa giá thực tế, giá gốc, email và hiển thị trang chủ với lượng đơn."],
      ["Relevant", "Tránh giảm giá vô ích với món có nhu cầu cố định."],
      ["Time-bound", "Đánh giá và áp dụng theo từng tuần, Tuần 146–155."],
    ],
  },
  {
    t: "Tối ưu công suất vận hành & điều phối nhân sự bếp",
    rows: [
      ["Specific", "Dự báo tổng khối lượng công việc theo chi nhánh để phân ca đầu bếp và nhân viên đóng gói."],
      ["Measurable", "Giảm tỷ lệ lệch ca dưới 10%, giảm chi phí OT do quá tải đột xuất 20%, duy trì mật độ vận hành an toàn."],
      ["Achievable", "Tổng nhu cầu mỗi bếp = tổng dự báo chi tiết các món của bếp đó."],
      ["Relevant", "Chủ động điều phối nguồn lực, giữ chất lượng và thời gian giao hàng."],
      ["Time-bound", "Hoàn thành kế hoạch nhân sự trước 5 ngày khi bắt đầu mỗi tuần vận hành."],
    ],
  },
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="01 · Project Overview"
        title="Bối cảnh doanh nghiệp và mục tiêu kinh doanh"
        intro="Fitfood Vietnam vận hành theo mô hình Bếp trung tâm (Cloud Kitchen): không phục vụ tại chỗ, tập trung sản xuất quy mô lớn các khẩu phần dinh dưỡng theo thực đơn cập nhật hàng tuần. Dự án AI được xây dựng để giải quyết trực tiếp các vấn đề quản trị cốt lõi."
        toc={[
          { id: "muc-tieu", label: "Mục tiêu SMART" },
          { id: "pestel", label: "PESTEL" },
          { id: "swot", label: "SWOT" },
          { id: "chuoi-gia-tri", label: "Chuỗi giá trị" },
          { id: "pain-points", label: "Pain points" },
        ]}
      />
      <Section id="muc-tieu" num="1.1" title="Mục tiêu kinh doanh (SMART)" lead="Dựa trên dữ liệu vận hành Tuần 1–145, áp dụng cho giai đoạn 10 tuần tiếp theo (Tuần 146–155). Đây là các mục tiêu đề ra, chưa phải kết quả đã đạt.">
        <div className="space-y-8">
          {GOALS.map((g, i) => (
            <div key={g.t}>
              <h3 className="mb-3 text-lg font-semibold">1.1.{i + 1}. {g.t}</h3>
              <DataTable head={["Tiêu chí", "Nội dung"]} rows={g.rows} />
            </div>
          ))}
        </div>
      </Section>
      <Section id="pestel" num="1.3" title="PESTEL" alt lead="Các tác động vĩ mô đến mô hình bếp trung tâm Fitfood. Nhóm cũng phân tích Business Model Canvas kết hợp khảo sát các bộ phận Marketing, Vận hành bếp và Chuỗi cung ứng.">
        <DataTable
          head={["Yếu tố", "Tác động"]}
          rows={[
            ["Political", "Quy định vệ sinh an toàn thực phẩm cho bếp công nghiệp và quy chuẩn đóng gói ảnh hưởng chi phí tuân thủ."],
            ["Economic", "Người tiêu dùng nhạy cảm về giá, cân nhắc chênh lệch giữa base_price và checkout_price."],
            ["Social", "Xu hướng ăn lành mạnh tạo khách trung thành nhưng đòi hỏi đa dạng danh mục (category, cuisine)."],
            ["Technological", "Ứng dụng Big Data và AI để cá nhân hóa email tiếp thị và dự báo tồn kho."],
            ["Environmental", "Sức ép giảm rác thải nhựa bao bì và giảm food waste."],
            ["Legal", "Quy định hợp đồng lao động thời vụ và đối tác giao hàng trong tuần cao điểm."],
          ]}
        />
      </Section>
      <Section id="swot" num="1.3" title="SWOT">
        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
          {[
            ["Strengths", ["Lợi thế kinh tế nhờ quy mô khi sản xuất tập trung.", "Dữ liệu lịch sử chi tiết về đặt hàng, giá bán, marketing."]],
            ["Weaknesses", ["Sản phẩm tươi sống hạn dùng cực ngắn; chưa xác định được món nhạy giá.", "Dự báo thủ công không bắt kịp biến động đơn hàng."]],
            ["Opportunities", ["Ứng dụng AI/ML dự báo chính xác, tạo lợi thế biên lợi nhuận.", "Cá nhân hóa khuyến mãi để tăng chuyển đổi."]],
            ["Threats", ["Đơn hàng dư thừa, phải tiêu hủy lương thực.", "Quá tải cục bộ tại các bếp (center_id) nếu dự báo sai."]],
          ].map(([t, items]) => (
            <div key={t as string} className="bg-background p-6">
              <h3 className="font-semibold">{t as string}</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-foreground">
                {(items as string[]).map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <Section id="chuoi-gia-tri" num="1.3" title="Chuỗi giá trị" alt>
        <DataTable
          head={["Hoạt động", "Liên hệ với dữ liệu"]}
          rows={[
            ["Thu mua", "Khối lượng mua thịt, cá, rau củ phụ thuộc vào dự báo đúng num_orders của từng meal_id."],
            ["Vận hành", "Gắn với op_area của từng center_id; lên ca dựa trên tổng đơn về từng bếp."],
            ["Giao hàng", "Số tài xế tỷ lệ thuận với khối lượng phần ăn xuất xưởng."],
            ["Marketing", "Khai thác độ co giãn của cầu qua checkout_price, homepage_featured, emailer_for_promotion."],
          ]}
        />
      </Section>
      <Section id="pain-points" num="1.4" title="Pain points">
        <div className="space-y-4">
          {[
            ["Lãng phí thực phẩm tươi sống và thiếu nguyên liệu", "Đơn hàng cùng món biến động mạnh; phương pháp trung bình quá khứ sai hàng trăm phần ăn mỗi món/tuần.", "Đặt món chịu tác động của khuyến mãi, sự nhàm chán, thay đổi danh mục; kế hoạch thu mua truyền thống không tính được các quy luật này."],
            ["Khủng hoảng công suất và mất cân đối nhân sự", "Tổng đơn về một bếp chênh 3–4 lần giữa tuần thấp điểm và cao điểm.", "Thiếu tầm nhìn Aggregate Demand; xếp ca cứng nhắc dẫn đến tuần quá tải, tuần dư người."],
            ["Bào mòn lợi nhuận do khuyến mãi kém hiệu quả", "Nhiều món dù có emailer_for_promotion = 1 nhưng đơn tăng không đáng kể.", "Không phân tích được độ nhạy giá từng món; giảm giá dàn trải làm mất biên lợi nhuận."],
          ].map(([t, s, r], i) => (
            <div key={t} className="rounded-md border border-border p-6">
              <h3 className="font-semibold">Vấn đề {i + 1}: {t}</h3>
              <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                <div><dt className="eyebrow">Triệu chứng</dt><dd className="mt-1">{s}</dd></div>
                <div><dt className="eyebrow">Nguyên nhân gốc rễ</dt><dd className="mt-1">{r}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </Section>
      <NextPage to="/san-pham" label="Định nghĩa sản phẩm" />
    </>
  );
}
