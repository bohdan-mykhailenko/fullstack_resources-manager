import { createFileRoute } from "@tanstack/react-router";

import { ConfirmEmailTokenPage } from "@/components/pages";

export const Route = createFileRoute("/confirm-email/$token")({
  component: ConfirmEmailTokenPage,
});
