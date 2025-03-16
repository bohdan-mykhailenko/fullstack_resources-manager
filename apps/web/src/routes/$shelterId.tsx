import { createFileRoute } from "@tanstack/react-router";

import { ShelterPage } from "@/components/pages";

const Component = () => {
  const { shelterId } = Route.useParams();

  return <ShelterPage id={shelterId} />;
};

export const Route = createFileRoute("/$shelterId")({
  component: Component,
});
