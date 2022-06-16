import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import { Check, X } from "tabler-icons-react";

const AddMusic = () => {
  const modals = useModals();

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value === "" ? "Campo obrigatório" : null),
      artist: (value) => (value === "" ? "Campo obrigatório" : null),
      genre: (value) => (value === "" ? "Campo obrigatório" : null),
    },
  });

  const [requesting, setRequesting] = useState(false);

  async function handleSubmit(values) {
    try {
      setRequesting(true);

      await axios.post("/api/songs", values);

      showNotification({
        message: "Música adicionada com sucesso!",
        color: "green",
        autoClose: 1000,
        icon: <Check />,
      });

      modals.closeAll();

      mutate("/api/songs");
    } catch (error) {
      showNotification({
        title: "Erro ao adicionar a música",
        message: "Reinicie o aplicativo e tente novamente",
        color: "red",
        autoClose: true,
        icon: <X />,
      });
    } finally {
      setRequesting(false);
    }
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack
        sx={{
          height: "100%",
        }}
        px="md"
        justify={"center"}
      >
        <TextInput
          label="Nome da música"
          required
          autoComplete="name"
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Nome do artista"
          required
          autoComplete="name"
          {...form.getInputProps("artist")}
        />

        <Select
          label="Gênero musical"
          placeholder="Selecione"
          searchable
          clearable
          allowDeselect
          nothingFound="Não disponível"
          data={["Pop", "Rock", "Funk", "Sertanejo"]}
          required
          {...form.getInputProps("genre", { type: "select" })}
        />

        <Button variant="filled" type="submit" loading={requesting}>
          Adicionar
        </Button>
      </Stack>
    </form>
  );
};

export default AddMusic;
