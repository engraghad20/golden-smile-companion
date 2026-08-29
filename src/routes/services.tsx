import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: () => <Outlet />,
});

export function useServicesPathname() {
  return useRouterState({ select: (state) => state.location.pathname });
}
