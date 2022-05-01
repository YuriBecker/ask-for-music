import { Button, PasswordInput, Stack } from "@mantine/core";
import React from "react";

const Home = () => {
  return (
    <Stack
      sx={{
        height: "100%",
      }}
      px="md"
      justify={"center"}
    >
      <PasswordInput
        label="Códido de autenticação"
        description="O código será informado pelo estabelecimento"
        required
        autoComplete="new-password"
      />

      <Button variant="filled">Acessar</Button>
    </Stack>
  );
};

export default Home;
