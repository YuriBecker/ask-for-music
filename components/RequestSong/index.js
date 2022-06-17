import {
  Box,
  Button,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSongsList } from "hooks/swrAbstractions";
import React, { useState } from "react";
import { useStore } from "hooks/useStore";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";

const RequestSong = () => {
  const [requesting, setRequesting] = useState(false);

  const listenerName = useStore((state) => state.listenerName);

  const { data: songData, isLoading: isLoadingSongs } = useSongsList();

  const songs = songData?.songs || [];
  const selectOptions = songs.map((song) => ({
    value: song.entityId,
    label: `${song.name} - ${song.artist}`,
    group: song.genre,
  }));

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      song: (value) => (value === "" ? "Campo obrigatório" : null),
    },
  });

  async function handleSubmit(values) {
    try {
      setRequesting(true);

      const payload = {
        requestedBy: listenerName || "Desconhecido",
        description: values.description,
        songId: values.songId,
      };

      await axios.post("/api/requests", payload);

      showNotification({
        message: "Pedido feito com sucesso!",
        color: "green",
        autoClose: 1000,
        icon: <Check />,
      });

      form.reset();
    } catch (error) {
      showNotification({
        title: "Erro ao pedir a música",
        message: "Reinicie o aplicativo e tente novamente",
        color: "red",
        autoClose: true,
        icon: <X />,
      });
    } finally {
      setRequesting(false);
    }
  }

  if (isLoadingSongs)
    return (
      <div style={{ height: "calc(100vh - 74px)", position: "relative" }}>
        <LoadingOverlay visible />
      </div>
    );

  return (
    <Box p="24px">
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack
          sx={{
            height: "100%",
          }}
          px="md"
          justify={"center"}
        >
          <Select
            label="Música"
            placeholder="Selecione"
            searchable
            clearable
            allowDeselect
            nothingFound="Não disponível"
            data={selectOptions}
            required
            {...form.getInputProps("songId", { type: "select" })}
          />

          <TextInput
            label="Descrição (opcional)"
            {...form.getInputProps("description")}
          />

          <Button variant="filled" type="submit" loading={requesting}>
            Pedir
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RequestSong;
