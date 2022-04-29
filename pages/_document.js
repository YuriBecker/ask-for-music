import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          <meta name="theme-color" content="#000000" />
          <meta name="application-name" content="Ask For Music" />
          <meta
            name="description"
            content="PWA app para pedir músicas em bares"
          />
          <meta
            name="format-detection"
            content="telephone=no,date=no,address=no,email=no,url=no"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto&display=optional"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
