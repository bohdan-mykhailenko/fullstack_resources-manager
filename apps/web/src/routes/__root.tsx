import { Container, VStack } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Header } from "@/components/navigation";

export const Route = createRootRoute({
  component: RootComponent,
});

const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/shelters",
    label: "Shelters",
  },
];

const APP_NAME = "AnimalShelters";

function RootComponent() {
  return (
    <VStack minHeight="100vh" width="100vw" bg="bg" color="white" py={6}>
      <Header
        routes={routes}
        appName={APP_NAME}
        borderBottom="1px solid"
        borderColor="border.muted"
        py={4}
        px={10}
      />

      <Container
        maxW="2xl"
        px={10}
        py={4}
        alignItems="center"
        justifyContent="center"
      >
        <Outlet />
      </Container>

      <TanStackRouterDevtools position="bottom-right" />
    </VStack>
  );
}
