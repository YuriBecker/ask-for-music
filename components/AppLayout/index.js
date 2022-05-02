import { ActionIcon, AppShell, Container, Header, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";

export default function AppLayout({ children }) {
  const router = useRouter();

  const paths = router.asPath.split("/");

  const mainRoute = paths[1] || "";

  const isMusician = mainRoute === "musician";

  return (
    <AppShell
      sx={(theme) => ({
        main: {
          background: theme.colors.gray[0],
          padding: 0,
        },
      })}
      fixed
      header={
        mainRoute ? (
          <Header
            height={50}
            p="md"
            sx={(theme) => ({
              backgroundColor: theme.colors.violet[6],
              maxWidth: theme.breakpoints.xs,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
            })}
          >
            <ActionIcon
              color={"violet"}
              variant="filled"
              style={{ position: "absolute", left: 10 }}
              onClick={() => router.back()}
            >
              <ArrowLeft color="white" />
            </ActionIcon>

            <Title
              order={3}
              sx={{
                color: "white",
              }}
            >
              {isMusician ? "Músico" : "Ouvinte"}
            </Title>
          </Header>
        ) : undefined
      }
    >
      <Container size="xs" px={0} sx={{ height: "100%" }}>
        {children}
      </Container>
    </AppShell>
  );
}
