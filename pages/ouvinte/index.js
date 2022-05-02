import { Button, Stack, TextInput } from "@mantine/core";
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
        <TextInput label="Qual o seu nome?" required autoComplete="name" />

        <Button variant="filled">Entrar</Button>
      </Stack>
    </DefaultTransition>
  );
};

export default Home;
