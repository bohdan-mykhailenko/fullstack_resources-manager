import { createFileRoute } from "@tanstack/react-router";

import { SheltersPage } from "@/components/pages";

export const Route = createFileRoute("/")({
  component: SheltersPage,
});
