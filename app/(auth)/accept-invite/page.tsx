import React, { Suspense } from "react";
import AcceptInviteClient from "./AcceptInviteClient";

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const email = Array.isArray(searchParams?.email) ? searchParams!.email[0] : searchParams?.email ?? "";
  const phone = Array.isArray(searchParams?.phone) ? searchParams!.phone[0] : searchParams?.phone ?? "";
  const token = Array.isArray(searchParams?.token) ? searchParams!.token[0] : searchParams?.token ?? "";

  return (
    <Suspense fallback={<div />}>
      <AcceptInviteClient email={email} phone={phone} token={token} />
    </Suspense>
  );
}
