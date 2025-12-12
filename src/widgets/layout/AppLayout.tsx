import { AppShell, NavLink, Stack, Button } from "@mantine/core";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/model/useAuth";

export function AppLayout() {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 220,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink
            label="Главная"
            component={Link}
            to="/"
            active={pathname === "/"}
          />
          <NavLink
            label="Персонажи"
            component={Link}
            to="/characters"
            active={pathname.startsWith("/characters")}
          />
          <NavLink
            label="Локации"
            component={Link}
            to="/locations"
            active={pathname.startsWith("/locations")}
          />
          <NavLink
            label="Эпизоды"
            component={Link}
            to="/episodes"
            active={pathname.startsWith("/episodes")}
          />

          <Button variant="light" color="red" mt="md" onClick={logout}>
            Выйти
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
