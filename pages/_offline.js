import { Alert } from "@mantine/core";
import { WifiOff } from "tabler-icons-react";

const Offline = () => {
  return (
    <>
      <Alert
        icon={<WifiOff size={20} />}
        title="Offline"
        color="red"
        variant="filled"
      >
        Você está sem internet. Verifique sua conexão e tente novamente!
      </Alert>
    </>
  );
};

export default Offline;
