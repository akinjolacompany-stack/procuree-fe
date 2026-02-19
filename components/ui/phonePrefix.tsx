

export default function PhonePrefix() {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-600">
      <span className="inline-flex h-5 w-5 overflow-hidden rounded-full border border-slate-300">
        <span className="w-1/3 bg-emerald-600" />
        <span className="w-1/3 bg-white" />
        <span className="w-1/3 bg-emerald-600" />
      </span>
      +234
    </span>
  );
}
