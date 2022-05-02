import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import DefaultTransition from "components/DefaultTransition";
import React, { useState } from "react";
import sleep from "utils/sleep";

const Home = () => {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value === "" ? "Campo obrigatório" : null),
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values) {
    try {
      setIsLoading(true);

      await sleep(2000);

      console.log(values);

      //request
    } catch (error) {
      // error toast
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DefaultTransition>
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack
          sx={{
            height: "100%",
          }}
          px="md"
          justify={"center"}
        >
          <TextInput
            label="Qual o seu nome?"
            required
            autoComplete="name"
            {...form.getInputProps("name")}
          />

          <Button variant="filled" type="submit" loading={isLoading}>
            Entrar
          </Button>
        </Stack>
      </form>
    </DefaultTransition>
  );
};

export default Home;
