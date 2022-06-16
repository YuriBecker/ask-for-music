import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  List,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useSongsList } from "hooks/swrAbstractions";
import { mutate } from "swr";
import { Check, Trash } from "tabler-icons-react";
import AddMusic from "./AddMusic";

const MySongs = () => {
  const { data: songData, isLoading: isLoadingSongs } = useSongsList();
  const modals = useModals();

  const songs = songData?.songs || [];

  const categories = [...new Set(songs.map((song) => song.genre))];

  const getSongFromGenre = (genre) => {
    return songs.filter((song) => song.genre === genre);
  };

  const openAddMusicModal = () => {
    modals.openModal({
      title: "Adicionar nova música",
      children: <AddMusic />,
    });
  };

  const deleteSong = (id, songName) => {
    modals.openConfirmModal({
      title: `Deletar música ${songName}`,
      centered: true,
      children: <Text size="sm">Tem certeza que deltar remover?</Text>,
      labels: { confirm: "Deletar música", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => modals.closeAll(),
      onConfirm: async () => {
        await mutate("/api/songs", async () => {
          await axios.delete("/api/songs", {
            data: {
              id: id,
            },
          });

          showNotification({
            message: "Música removida com sucesso!",
            color: "green",
            autoClose: 1000,
            icon: <Check />,
          });

          const filtered = songs.filter((item) => item.entityId !== id);

          return {
            songs: filtered,
          };
        });

        modals.closeAll();
      },
    });
  };

  if (isLoadingSongs)
    return (
      <div style={{ height: "calc(100vh - 74px)", position: "relative" }}>
        <LoadingOverlay visible />
      </div>
    );

  return (
    <Box p="24px">
      <Accordion mb={"lg"}>
        {categories.map((categorie) => {
          const currentSongs = getSongFromGenre(categorie);

          return (
            <Accordion.Item label={categorie} key={categorie}>
              <List>
                {currentSongs.map((song) => (
                  <Box
                    key={song.entityId}
                    mb="16px"
                    sx={{ position: "relative" }}
                  >
                    <Text size="sm">{song.name}</Text>

                    <Text color="dimmed" size="sm">
                      {song.artist}
                    </Text>

                    <ActionIcon
                      variant="filled"
                      color="red"
                      sx={{ position: "absolute", top: 4, right: "24px" }}
                      onClick={() => deleteSong(song.entityId, song.name)}
                    >
                      <Trash size={16} />
                    </ActionIcon>
                  </Box>
                ))}
              </List>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Button fullWidth onClick={openAddMusicModal}>
        Adicionar nova música
      </Button>
    </Box>
  );
};

export default MySongs;
