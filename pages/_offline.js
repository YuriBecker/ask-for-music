import { Alert, Center, DEFAULT_THEME } from "@mantine/core";
import Head from "next/head";
import { WifiOff } from "tabler-icons-react";

const Offline = () => {
  return (
    <>
      <Head>
        <title>Você está offline</title>
        <meta name="theme-color" content={DEFAULT_THEME.colors.red[6]} />
      </Head>

      <Center
        component="main"
        sx={{
          height: "100%",
        }}
        px="md"
      >
        <Alert
          icon={<WifiOff size={20} />}
          title="Offline"
          color="red"
          variant="filled"
        >
          Você está sem internet. Verifique sua conexão e tente novamente!
        </Alert>
      </Center>
    </>
  );
};

export default Offline;
