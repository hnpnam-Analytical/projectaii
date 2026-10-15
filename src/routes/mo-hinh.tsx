import { createFileRoute } from "@tanstack/react-router";
import { meta, PageHeader, Section, DataTable, Stat, Callout, NextPage } from "@/components/site/Layout";

export const Route = createFileRoute("/mo-hinh")({
  head: () => meta("Mô hình dự báo & kết quả", "So sánh 5 mô hình dự báo nhu cầu, CatBoost tinh chỉnh bằng Optuna đạt MAE 69,48 so với baseline 168,66 suất ăn."),
  component: Page,
});

const MODELS = [
  ["CatBoost", 0.416, 0.537, 70.71, 121.9],
  ["XGBoost", 0.4399, 0.5674, 76.48, 136.23],
  ["Random Forest", 0.4429, 0.5674, 76.63, 134.95],
  ["Gradient Boosting", 0.4541, 0.5751, 80.79, 142.34],
  ["LightGBM", 0.4532, 0.5739, 81.0, 142.68],
] as const;
const vn = (n: number) => n.toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 4 });

function Page() {
  const all = [["Baseline (Train Mean)", 168.66], ...MODELS.map((m) => [m[0], m[3]]), ["CatBoost + Optuna", 69.48]] as [string, number][];
  return (
    <>
      <PageHeader
        eyebrow="06 · Modeling"
        title="Xây dựng, đánh giá và tối ưu mô hình dự báo"
        intro="Bài toán hồi quy trên dữ liệu bảng có yếu tố thời gian. Năm mô hình được đánh giá trên cùng cách chia Train/Validation (tuần 136–145), đo bằng MAE và RMSE trên thang đo số đơn hàng gốc."
        toc={[
          { id: "baseline", label: "Baseline" },
          { id: "so-sanh", label: "So sánh 5 mô hình" },
          { id: "optuna", label: "Tối ưu Optuna" },
          { id: "van-de", label: "Vấn đề & kết luận" },
        ]}
      />
      <Section id="baseline" num="5.1" title="Mốc cơ sở" lead="Train Mean Predictor dự báo mọi quan sát Validation bằng giá trị trung bình biến mục tiêu đã biến đổi (tương ứng 132,96 suất ăn trên thang gốc). Đây là ngưỡng sai số tối thiểu mọi mô hình ML phải vượt qua.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="168,66" label="MAE gốc" note="suất ăn" />
          <Stat value="292,24" label="RMSE gốc" note="suất ăn" />
          <Stat value="0,7851" label="MAE transformed" />
          <Stat value="0,9528" label="RMSE transformed" />
        </div>
      </Section>
      <Section id="so-sanh" num="6.1" title="So sánh năm mô hình" alt lead="MAE đo sai lệch tuyệt đối trung bình (dễ diễn giải theo số đơn); RMSE phạt nặng sai số lớn. Thứ hạng sắp xếp theo MAE gốc.">
        <DataTable
          head={["#", "Mô hình", "MAE transf.", "RMSE transf.", "MAE gốc", "RMSE gốc"]}
          rows={MODELS.map((m, i) => [String(i + 1), m[0], vn(m[1]), vn(m[2]), vn(m[3]), vn(m[4])])}
          highlight={0}
        />
        <div className="mt-8 rounded-md border border-border bg-background p-6">
          <p className="mb-4 text-sm font-semibold text-primary">MAE gốc (đơn hàng) — thấp hơn là tốt hơn</p>
          <div className="space-y-2.5">
            {all.map(([n, v]) => (
              <div key={n} className="grid grid-cols-[9.5rem_1fr_3.5rem] items-center gap-3 text-sm">
                <span className="truncate text-muted-foreground">{n}</span>
                <div className="h-5 rounded-sm bg-muted">
                  <div className={`h-5 rounded-sm ${n.includes("Optuna") ? "bg-secondary" : n.startsWith("Baseline") ? "bg-chart-4" : "bg-primary"}`} style={{ width: `${(v / 170) * 100}%` }} />
                </div>
                <span className="text-right font-medium tabular-nums">{vn(v)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Callout title="Nhận xét">CatBoost thấp nhất ở cả hai chỉ số và được chọn để tinh chỉnh. Kết luận chỉ phản ánh tập Validation tuần 136–145 và cấu hình đã thử, không chứng minh CatBoost luôn tốt hơn trong mọi dữ liệu.</Callout>
        </div>
      </Section>
      <Section id="optuna" num="7" title="Tối ưu CatBoost bằng Optuna" lead="Optuna đề xuất cấu hình, huấn luyện, inverse transform dự báo và tính MAE gốc; sau 25 thử nghiệm, cấu hình MAE thấp nhất được chọn. Dự báo cuối được đưa về thang gốc bằng inverse Yeo–Johnson và giới hạn không âm.">
        <div className="grid gap-6 lg:grid-cols-2">
          <DataTable
            head={["Siêu tham số", "Ban đầu", "Sau Optuna"]}
            rows={[
              ["iterations", "100", "562"],
              ["learning_rate", "Không khai báo", "0,075275"],
              ["depth", "8", "10"],
              ["l2_leaf_reg", "Mặc định", "6,156640"],
              ["random_strength", "Mặc định", "0,001805"],
              ["bagging_temperature", "Mặc định", "0,513539"],
              ["random_seed", "42", "42"],
            ]}
          />
          <DataTable
            head={["Chỉ số", "Ban đầu", "Sau Optuna", "Cải thiện"]}
            rows={[
              ["MAE gốc", "70,71", "69,48", "−1,23 (≈1,74%)"],
              ["RMSE gốc", "121,90", "119,69", "−2,21 (≈1,81%)"],
            ]}
            caption="Có ý nghĩa thực nghiệm nhưng chưa đủ khẳng định tối ưu tuyệt đối, do chỉ 25 thử nghiệm trong phạm vi đã khai báo."
          />
        </div>
      </Section>
      <Section id="van-de" num="8–9" title="Vấn đề & kết luận" alt>
        <div className="grid gap-4 md:grid-cols-3">
          <Callout title="Dữ liệu nhu cầu bị lệch">num_orders lệch phải lớn; Yeo–Johnson giảm Skewness từ 6,9299 xuống −0,0019.</Callout>
          <Callout title="Khác biệt giữa mô hình">Kết quả các mô hình không giống nhau, cần so sánh trên cùng tập Validation.</Callout>
          <Callout title="Phạm vi lịch sử">Chỉ 145 tuần; mô hình có thể khó dự báo các điều kiện chưa xuất hiện (nhu cầu đột biến, thay đổi giá).</Callout>
        </div>
        <p className="prose-body mt-6">Mục tiêu kinh doanh đặt ra là MAE dưới 50 phần ăn/món/tuần; kết quả hiện tại (69,48) đã giảm mạnh so với baseline nhưng chưa đạt ngưỡng đó.</p>
      </Section>
      <NextPage to="/dashboard" label="Dashboard & User flow" />
    </>
  );
}
