import Head from "next/head";
import { Container, MantineProvider } from "@mantine/core";
import manifest from "public/manifest.json";

export default function App({ Component, pageProps }) {
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
          // primaryColor: "indigo",
          loader: "bars",
        }}
        defaultProps={{
          TextInput: { size: "md" },
          Butttom: { size: "md" },
        }}
      >
        <Container size="sm" p="lg">
          <Component {...pageProps} />
        </Container>
      </MantineProvider>
    </>
  );
}
