import { createFileRoute } from "@tanstack/react-router";

import { ShelterPage } from "@/components/pages";

export const Route = createFileRoute("/$shelterId")({
  component: ShelterPage,
});
