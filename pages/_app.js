import {
  ActionIcon,
  Affix,
  MantineProvider,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import AppLayout from "components/AppLayout";
import Head from "next/head";
import manifest from "public/manifest.json";
import { ArrowUpCircle } from "tabler-icons-react";
import "styles/global.css";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export default function App({ Component, pageProps }) {
  const [scroll, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();

  if (pageProps.isSwaggerPage) {
    return (
      <>
        <Head>
          <title>API Doc</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{manifest.name}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          fontFamily: "Roboto, sans-serif",
          headings: {
            fontFamily: "Roboto, sans-serif",
          },
          primaryColor: "violet",
          loader: "bars",
        }}
        defaultProps={{
          TextInput: { size: "md" },
          Buttton: { size: "md" },
          PasswordInput: { size: "md" },
          Select: { size: "md" },
        }}
      >
        <NotificationsProvider position="top-center">
          <ModalsProvider>
            <AppLayout>
              <Component {...pageProps} />

              <Affix position={{ bottom: 10, right: 10 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                  {(transitionStyles) => (
                    <ActionIcon
                      style={transitionStyles}
                      onClick={() => scrollTo({ y: 0 })}
                      sx={{
                        backgroundColor: theme.colors.violet[6],
                      }}
                      size="lg"
                      title="Ir para o topo"
                      variant="filled"
                    >
                      <ArrowUpCircle size="lg" color="white" />
                    </ActionIcon>
                  )}
                </Transition>
              </Affix>
            </AppLayout>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
