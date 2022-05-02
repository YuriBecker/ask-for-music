import { Button, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import DefaultTransition from "components/DefaultTransition";
import React, { useState } from "react";
import sleep from "utils/sleep";

const Home = () => {
  const form = useForm({
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) => (value === "" ? "Campo obrigatório" : null),
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
          <PasswordInput
            label="Códido de autenticação"
            description="O código será informado pelo estabelecimento"
            required
            autoComplete="off"
            {...form.getInputProps("password")}
          />

          <Button variant="filled" type="submit" loading={isLoading}>
            Acessar
          </Button>
        </Stack>
      </form>
    </DefaultTransition>
  );
};

export default Home;
