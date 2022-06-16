import { AppShell, Container } from "@mantine/core";

export default function AppLayout({ children }) {
  return (
    <AppShell
      sx={(theme) => ({
        main: {
          background: theme.colors.gray[0],
          padding: 0,
        },
      })}
      fixed
    >
      <Container size="xs" px={0} sx={{ height: "100%" }}>
        {children}
      </Container>
    </AppShell>
  );
}
