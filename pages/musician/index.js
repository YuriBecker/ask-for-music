import {
  ActionIcon,
  Button,
  Header,
  PasswordInput,
  Stack,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import DefaultTransition from "components/DefaultTransition";
import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { ArrowLeft, Check, X } from "tabler-icons-react";
import sleep from "utils/sleep";
import { useRouter } from "next/router";

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

  const router = useRouter();

  async function handleSubmit(values) {
    try {
      setIsLoading(true);

      await axios.post("/api/verify-auth", {
        code: values.password,
      });

      showNotification({
        title: "Autenticado com sucesso!",
        message: "Você será redirecionado",
        color: "green",
        autoClose: 1000,
        icon: <Check />,
      });

      await sleep(1000);

      router.push("/musician/authenticated");
    } catch (error) {
      showNotification({
        title: "Código inválido!",
        message: "Verifique o código e tente novamente",
        color: "red",
        autoClose: true,
        icon: <X />,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header
        height={50}
        p="md"
        sx={(theme) => ({
          backgroundColor: theme.colors.violet[6],
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
        })}
      >
        <ActionIcon
          color={"violet"}
          variant="filled"
          style={{ position: "absolute", left: 10 }}
          onClick={() => router.back()}
        >
          <ArrowLeft color="white" />
        </ActionIcon>

        <Title
          order={3}
          sx={{
            color: "white",
          }}
        >
          Músico
        </Title>
      </Header>

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
    </>
  );
};

export default Home;
