import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, DataTable, Stat, NextPage } from "@/components/site/Layout";

export const Route = createFileRoute("/du-lieu")({
  head: () => meta("Dữ liệu: audit, đặc trưng & quản trị", "Audit chất lượng 456.548 bản ghi, biến đổi Yeo–Johnson, 46 đặc trưng huấn luyện, hạn chế và khung quản trị dữ liệu."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="05 · Data"
        title="Khám phá, biến đổi và quản trị dữ liệu"
        intro="Bộ dữ liệu hợp nhất từ train.csv, meal_info.csv và fulfilment_center_info.csv qua khóa center_id và meal_id, sau đó được biến đổi thành train_final.csv gồm 49 thuộc tính."
        toc={[
          { id: "audit", label: "Data audit" },
          { id: "bien-doi", label: "Biến đổi mục tiêu" },
          { id: "dac-trung", label: "Đặc trưng" },
          { id: "han-che", label: "Hạn chế" },
          { id: "quan-tri", label: "Quản trị dữ liệu" },
        ]}
      />
      <Section id="audit" num="1" title="Data audit">
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="456.548" label="Quan sát" />
          <Stat value="15" label="Thuộc tính gốc" />
          <Stat value="0 · 0" label="Missing · Duplicate" />
          <Stat value="145 tuần" label="Chuỗi thời gian" note="≈ 2,8 năm vận hành" />
        </div>
        <p className="prose-body">Không có bản ghi trùng theo id hay bộ ba (week, center_id, meal_id). Dữ liệu bao phủ 77 trung tâm và 51 mã món thuộc 14 danh mục. Quá trình EDA phát hiện num_orders lệch phải mạnh (đỉnh đột biến 24.299 đơn) và hiện tượng phụ thu giá (checkout_price &gt; base_price).</p>
      </Section>
      <Section id="bien-doi" num="2" title="Biến đổi biến mục tiêu" alt lead="num_orders có 456.548 quan sát, nhỏ nhất bằng 13 và đều dương. Nhóm thử bốn phép biến đổi, quan sát Histogram/Q–Q Plot và so sánh Skewness cùng kiểm định Shapiro–Wilk.">
        <DataTable
          head={["Phương pháp", "Skewness sau biến đổi", "|Skewness|", "Shapiro–Wilk p-value"]}
          rows={[
            ["Yeo–Johnson", "−0,001895", "0,001895", "5,116 × 10⁻²²"],
            ["Box–Cox", "−0,004085", "0,004085", "1,396 × 10⁻²³"],
            ["Log1p", "−0,021918", "0,021918", "3,042 × 10⁻²⁴"],
            ["Log", "−0,048702", "0,048702", "6,749 × 10⁻²⁵"],
            ["Dữ liệu gốc", "6,929943", "6,929943", "4,225 × 10⁻⁷⁷"],
          ]}
          highlight={0}
          caption="Yeo–Johnson được chọn (λ = 0,007924). p-value vẫn < 0,05 nên không thể khẳng định phân phối sau biến đổi là chuẩn."
        />
      </Section>
      <Section id="dac-trung" num="3" title="Đặc trưng huấn luyện" lead="Notebook dùng 46 đặc trưng. Loại trừ id, num_orders, num_orders_yeojohnson (nhãn) và season_name (chuỗi văn bản) để tránh rò rỉ dữ liệu.">
        <DataTable
          head={["Nhóm", "Các cột"]}
          rows={[
            ["Thời gian", "week, year_num, week_of_year, quarter, is_festive_season, is_summer_season"],
            ["Trung tâm & khu vực", "center_id, city_code, region_code, op_area, center_type_encoded, center_type_TYPE_A/B/C"],
            ["Sản phẩm & ẩm thực", "meal_id, category_encoded, cuisine_encoded, one-hot 14 category, cuisine_Continental/Indian/Italian/Thai"],
            ["Giá & khuyến mãi", "checkout_price, base_price, emailer_for_promotion, homepage_featured, discount_amount, discount_percent, price_ratio, total_promo"],
            ["Tương tác", "promo_x_discount, price_rel_to_cat_avg, promo_x_op_area"],
          ]}
        />
      </Section>
      <Section id="han-che" num="5" title="Hạn chế & điều kiện áp dụng" alt>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">Yếu tố chưa phản ánh trong dữ liệu</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Ngoại cảnh: thời tiết, giao thông, sự kiện kinh tế – xã hội.</li>
              <li>Trải nghiệm khách: tỷ lệ hủy đơn, thời gian giao, đánh giá, độ trung thành.</li>
              <li>Bối cảnh cạnh tranh: giá và chiến dịch của đối thủ.</li>
              <li>Tài chính: thiếu COGS và chi phí vận hành bếp.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Không khuyến nghị áp dụng</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Dự báo theo giờ / theo ngày (dữ liệu theo tuần).</li>
              <li>Trung tâm mới chưa có lịch sử (cold-start center).</li>
              <li>Món mới ra mắt (cold-start meal).</li>
              <li>Giai đoạn biến động thị trường bất thường chưa từng xuất hiện.</li>
            </ul>
          </div>
        </div>
      </Section>
      <Section id="quan-tri" num="6" title="Khung quản trị dữ liệu">
        <DataTable
          head={["Hạng mục", "Nội dung"]}
          rows={[
            ["Chủ sở hữu vận hành", "Supply Chain & Operations: thông tin trung tâm và danh mục món."],
            ["Chủ sở hữu thương mại", "Marketing & Quản trị doanh thu: base_price, checkout_price, cờ email và trang chủ."],
            ["Technical Data Steward", "Data Engineering & AI: vận hành pipeline 15 → 49 thuộc tính, chống rò rỉ dữ liệu."],
            ["Kiểm soát truy cập", "Read-only cho Analyst/Data Scientist; Write/Admin chỉ cho ETL tự động và Data Engineer."],
            ["Riêng tư", "Phi định danh hoàn toàn, không lưu PII; thực thể mã hóa thành center_id, city_code, region_code, meal_id."],
            ["Lưu trữ & cập nhật", "Cloud Data Warehouse dạng Parquet/Delta; Weekly Batch, tự động audit và chạy pipeline khi có tuần mới."],
          ]}
        />
      </Section>
      <NextPage to="/mo-hinh" label="Mô hình dự báo" />
    </>
  );
}
