type ReviewSummaryRowProps = {
  label: string;
  value: string;
};

export default function ReviewSummaryRow({ label, value }: ReviewSummaryRowProps) {
  return (
    <div className="flex items-center gap-7">
      <p className="w-[130px] font-medium text-sm  text-[#9CA3AF]">{label}</p>
      <p className="text-[14px] font-[500] text-[#1F2933]">{value}</p>
    </div>
  );
}
