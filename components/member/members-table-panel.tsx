"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable, type DataTableColumn } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { SearchIcon } from "../item/search-icon";

type MemberStatus = "Active" | "Inactive" | "Pending";

type MemberRow = {
  id: string;
  serial: number;
  name: string;
  phoneNumber: string;
  dateJoined: string;
  status: MemberStatus;
  tone: "rose" | "sky" | "amber" | "emerald" | "slate";
};

const MEMBERS: MemberRow[] = [
  {
    id: "member-1",
    serial: 1,
    name: "Ngozi Obi",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Active",
    tone: "rose",
  },
  {
    id: "member-2",
    serial: 2,
    name: "Ifeoma Okeke",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Inactive",
    tone: "sky",
  },
  {
    id: "member-3",
    serial: 3,
    name: "Fatima Musa",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Active",
    tone: "amber",
  },
  {
    id: "member-4",
    serial: 4,
    name: "Chukwuemeka Eze",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Pending",
    tone: "emerald",
  },
  {
    id: "member-5",
    serial: 5,
    name: "Aisha Bello",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Active",
    tone: "slate",
  },
  {
    id: "member-6",
    serial: 6,
    name: "Babatunde Adebayo",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Inactive",
    tone: "rose",
  },
  {
    id: "member-7",
    serial: 7,
    name: "Emeka Okoro",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Pending",
    tone: "sky",
  },
  {
    id: "member-8",
    serial: 8,
    name: "Tosin Adeyemi",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Active",
    tone: "amber",
  },
  {
    id: "member-9",
    serial: 9,
    name: "Kemi Daniels",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Inactive",
    tone: "emerald",
  },
  {
    id: "member-10",
    serial: 10,
    name: "Rasheed Balogun",
    phoneNumber: "+234(0) 81 4072 8393",
    dateJoined: "12/02/2026",
    status: "Active",
    tone: "slate",
  },
];

const avatarToneStyles: Record<MemberRow["tone"], string> = {
  rose: "bg-rose-100 text-rose-700",
  sky: "bg-sky-100 text-sky-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  slate: "bg-slate-200 text-slate-700",
};

const statusStyles: Record<
  MemberStatus,
  { wrapper: string; dot: string; text: string }
> = {
  Active: {
    wrapper: "bg-emerald-50",
    dot: "bg-emerald-500",
    text: "text-emerald-600",
  },
  Inactive: {
    wrapper: "bg-red-50",
    dot: "bg-red-500",
    text: "text-red-600",
  },
  Pending: {
    wrapper: "bg-slate-100",
    dot: "bg-slate-500",
    text: "text-slate-600",
  },
};

const MEMBER_COLUMNS: DataTableColumn<MemberRow>[] = [
  {
    id: "serial",
    header: "S/N",
    accessorKey: "serial",
    headerClassName: "w-[72px]",
    cellClassName: "text-[#667085]",
  },
  {
    id: "name",
    header: "Name",
    cell: (row) => (
      <div className="flex items-center gap-2.5">
        <MemberAvatar name={row.name} tone={row.tone} />
        <span className="font-medium text-[#344054]">{row.name}</span>
      </div>
    ),
    cellClassName: "min-w-[220px]",
  },
  {
    id: "phoneNumber",
    header: "Phone Number",
    accessorKey: "phoneNumber",
    cellClassName: "text-[#475467]",
  },
  {
    id: "dateJoined",
    header: "Date Joined",
    accessorKey: "dateJoined",
    cellClassName: "text-[#475467]",
  },
  {
    id: "status",
    header: "Status",
    align: "center",
    cell: (row) => {
      const style = statusStyles[row.status];
      return (
        <span
          className={cn(
            "inline-flex min-w-[84px] items-center justify-center gap-1 rounded-[8px] px-2 py-1 text-xs font-semibold",
            style.wrapper,
            style.text,
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", style.dot)} />
          <span>{row.status}</span>
        </span>
      );
    },
  },
];

function MemberAvatar({
  name,
  tone,
}: {
  name: string;
  tone: MemberRow["tone"];
}) {
  const initials = name
    .split(" ")
    .map((chunk) => chunk[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
        avatarToneStyles[tone],
      )}
    >
      {initials}
    </span>
  );
}

export function MembersTablePanel({ className }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return MEMBERS;
    }

    return MEMBERS.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.phoneNumber.toLowerCase().includes(query) ||
        member.status.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  return (
    <Card
      className={cn("rounded-[8px] border border-[#E4E7EC] p-4", className)}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="w-full max-w-[420px]">
          <p className="text-[10px] font-bold uppercase text-[#98A2B3]">Members</p>
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="search..."
            suffix={<SearchIcon className="h-4 w-4" />}
            className="mt-2 h-9 rounded-[6px] border-[#D0D5DD]"
            aria-label="Search members"
          />
        </div>

        <Button type="button" className="h-10 min-w-[146px] rounded-[8px]">
          Invite Member
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-[8px] bg-white">
        <DataTable
          columns={MEMBER_COLUMNS}
          rows={filteredMembers}
          rowKey="id"
          variant="clean"
          pagination={{ pageSize: 7 }}
          tableClassName="text-xs"
          emptyState="No members match your search."
        />
      </div>
    </Card>
  );
}
