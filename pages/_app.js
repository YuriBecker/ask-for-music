import {
  ActionIcon,
  Affix,
  Container,
  MantineProvider,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import Head from "next/head";
import manifest from "public/manifest.json";
import { ArrowUpCircle } from "tabler-icons-react";

import "styles/global.css";
import AppLayout from "components/AppLayout";

export default function App({ Component, pageProps }) {
  const [scroll, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();

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
        }}
      >
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
      </MantineProvider>
    </>
  );
}
