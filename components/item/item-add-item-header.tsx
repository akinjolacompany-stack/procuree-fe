
export default function ItemHeader() {
  return (
    <div>
      <h2 className="text-[20px] font-[600] leading-8 text-[#1F2933]">
        Add New Item
      </h2>

      <div className="mt-2 rounded-[6px] border border-l-[8px] border-[#2563EB] bg-[#EEF4FF] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <p className="text-[16px] font-[500] text-[#1F2933]">
            How it works
          </p>
        </div>
        <p className="mt-1 text-[11px] font-[400] text-[#1F2933]">
          Set up your base unit (e.g., Cup) and define how other units convert
          to it. When you price a market run, you only set the base unit price
          and the system calculates everything else.
        </p>
      </div>
    </div>
  );
}
