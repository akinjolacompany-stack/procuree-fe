"use client";

import { EditIcon } from "@/components/icons/edit";
import { MarketRunHeader } from "@/components/marketRun/header-marketrun";
import ReviewItemRow, {
  ReviewItem,
} from "@/components/marketRun/reviewItemRow";
import ReviewSummaryRow from "@/components/marketRun/reviewSummaryRow";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { useRouter } from "next/navigation";

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: "review-item-1",
    name: "Rice",
    baseUnit: "Cup",
    basePrice: "₦450",
    minimumOrder: "1",
    maximumOrder: "No Maximum Order",
    tone: "amber",
  },
  {
    id: "review-item-2",
    name: "Beans",
    baseUnit: "Cup",
    basePrice: "₦700",
    minimumOrder: "3",
    maximumOrder: "No Maximum Order",
    tone: "sky",
  },
  {
    id: "review-item-3",
    name: "Ijebu Garri - yellow",
    baseUnit: "Cup",
    basePrice: "₦550",
    minimumOrder: "2",
    maximumOrder: "No Maximum Order",
    tone: "rose",
  },
];

const REVIEW_SUMMARY_ROWS = [
  { label: "Description", value: "Dry Good Market Run" },
  { label: "Market Run Date", value: "12th Jan 2026" },
  { label: "Booking End Date", value: "10th Jan 2026" },
];

export default function MarketRunReviewPage() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[1005px] rounded-[10px] bg-white p-8">
      <MarketRunHeader
        title="Review & Publish"
        subtitle="Review and publish details before publishing"
      />

      <div className="mt-6 rounded-[10px] bg-[#F8FAFC] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            {REVIEW_SUMMARY_ROWS.map((row) => (
              <ReviewSummaryRow
                key={row.label}
                label={row.label}
                value={row.value}
              />
            ))}
          </div>

          <IconButton
            label="Edit run details"
            className="text-[#667085] transition-colors hover:text-[#475467]"
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>

      <div className="mt-4 max-h-[360px] space-y-3 overflow-y-auto pr-1">
        {REVIEW_ITEMS.map((item) => (
          <ReviewItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-6 border-t border-[#E4E7EC] pt-6">
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            color="slate"
            variant="outline"
            onClick={() => router.push("/market-run/item")}
          >
            Cancel
          </Button>
          <Button type="button" color="blue">
            Save as Draft
          </Button>
          <Button type="button" onClick={() => router.push("/dashboard")}>
            Publish Market Run
          </Button>
        </div>
      </div>
    </div>
  );
}
