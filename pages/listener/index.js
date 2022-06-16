import {
  ActionIcon,
  Button,
  Header,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import DefaultTransition from "components/DefaultTransition";
import { useStore } from "hooks/useStore";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";

const Home = () => {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value === "" ? "Campo obrigatório" : null),
    },
  });

  const router = useRouter();
  const setListenerName = useStore((state) => state.setListenerName);

  function handleSubmit(values) {
    setListenerName(values.name);
    router.push("/listener/authenticated");
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
          Ouvinte
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
            <TextInput
              label="Qual o seu nome?"
              required
              autoComplete="name"
              {...form.getInputProps("name")}
            />

            <Button variant="filled" type="submit">
              Entrar
            </Button>
          </Stack>
        </form>
      </DefaultTransition>
    </>
  );
};

export default Home;
