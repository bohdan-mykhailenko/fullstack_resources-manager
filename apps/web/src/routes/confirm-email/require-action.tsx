import { createFileRoute } from "@tanstack/react-router";

import { ConfirmEmailRequireActionPage } from "@/components/pages";

export const Route = createFileRoute("/confirm-email/require-action")({
  component: ConfirmEmailRequireActionPage,
});
