import { Button, PasswordInput, Stack } from "@mantine/core";
import DefaultTransition from "components/DefaultTransition";
import React from "react";

const Home = () => {
  return (
    <DefaultTransition>
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
    </DefaultTransition>
  );
};

export default Home;
