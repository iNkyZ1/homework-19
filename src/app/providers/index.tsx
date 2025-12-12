import { ReactNode } from "react";
import { MantineProvider, Center, Loader } from "@mantine/core";
import { MantineEmotionProvider } from "@mantine/emotion";
import { AuthProvider } from "../../hoc/AuthProvider";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <MantineEmotionProvider>
      <MantineProvider
        defaultColorScheme="light"
        theme={{
          primaryColor: "blue",
          defaultRadius: "md",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <AuthProvider>{children}</AuthProvider>
      </MantineProvider>
    </MantineEmotionProvider>
  );
}

export function AppLoader() {
  return (
    <Center h="100vh">
      <Loader />
    </Center>
  );
}
