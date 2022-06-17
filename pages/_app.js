import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import AppLayout from "components/AppLayout";
import Head from "next/head";
import manifest from "public/manifest.json";
import "styles/global.css";

export default function App({ Component, pageProps }) {
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
            </AppLayout>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
