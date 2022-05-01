import { Alert, Center } from "@mantine/core";
import { WifiOff } from "tabler-icons-react";

const Offline = () => {
  return (
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
  );
};

export default Offline;
