import { Box, Button } from "@mantine/core";
import { useStore } from "hooks/useStore";
import { useRouter } from "next/router";

const Options = () => {
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Box p="24px">
      <Button variant="filled" color="red" fullWidth onClick={onLogout}>
        Sair
      </Button>
    </Box>
  );
};

export default Options;
