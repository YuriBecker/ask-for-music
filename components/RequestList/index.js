import {
  ActionIcon,
  Box,
  Button,
  LoadingOverlay,
  Text,
  Timeline,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRequestList, useSongsList } from "hooks/swrAbstractions";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { Check, Music, Refresh, Trash, X } from "tabler-icons-react";

const RequestList = ({ isMusician = false }) => {
  const {
    data: requestData,
    isLoading: isLoadingRequests,
    isValidating,
  } = useRequestList();
  const { data: songData, isLoading: isLoadingSongs } = useSongsList();

  const [isDeleting, setIsDeleting] = useState({
    state: false,
    id: null,
  });

  const { mutate } = useSWRConfig();

  const requests = requestData?.requests;
  const songs = songData?.songs;

  const deleteSongRequest = async (requestId) => {
    try {
      setIsDeleting({
        state: true,
        id: requestId,
      });

      await mutate("/api/requests", async () => {
        await axios.delete("/api/requests", {
          data: { id: requestId },
        });

        showNotification({
          message: "Removido com sucesso!",
          color: "green",
          autoClose: 1000,
          icon: <Check />,
        });

        const filtered = requests.filter((item) => item.entityId !== requestId);

        return {
          requests: filtered,
        };
      });
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Erro ao deletar",
        message: "Reinicie o aplicativo e tente novamente",
        color: "red",
        autoClose: true,
        icon: <X />,
      });
    } finally {
      setIsDeleting({
        state: false,
        id: null,
      });
    }
  };

  if (isLoadingRequests || isLoadingSongs)
    return (
      <div style={{ height: "calc(100vh - 74px)", position: "relative" }}>
        <LoadingOverlay visible />
      </div>
    );

  if (requests.length === 0)
    return (
      <Box p="24px" style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="outline"
          mx={"auto"}
          mb="24px"
          onClick={() => mutate("/api/requests")}
          leftIcon={<Refresh />}
          size="xs"
          loading={isValidating}
        >
          {isValidating ? "Atualizando" : "Atualizar"}
        </Button>

        <Text color="dimmed" size="lg" align="center" i>
          Nenhum pedido encontrado!
        </Text>
      </Box>
    );

  return (
    <Box p="24px" style={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="outline"
        mx={"auto"}
        mb="24px"
        onClick={() => mutate("/api/requests")}
        leftIcon={<Refresh />}
        size="xs"
        loading={isValidating}
      >
        {isValidating ? "Atualizando" : "Atualizar"}
      </Button>

      <Timeline active={0} bulletSize={28} color="primary">
        {requests.map((request, index) => {
          const currentSong = songs.find(
            (song) => song.entityId === request.songId
          );

          const isCurrentSong = index === 0;

          if (currentSong)
            return (
              <Timeline.Item
                bullet={<Music size={16} />}
                title={currentSong.name}
                key={request.entityId}
                color={isCurrentSong ? "purple" : "dimmed"}
              >
                {isMusician && (
                  <ActionIcon
                    variant="filled"
                    color="red"
                    sx={{ position: "absolute", top: 0, right: "24px" }}
                    loading={
                      isDeleting.state && isDeleting.id === request.entityId
                    }
                    onClick={() => deleteSongRequest(request.entityId)}
                  >
                    <Trash size={16} />
                  </ActionIcon>
                )}

                <Text color="dimmed" size="sm">
                  {currentSong.artist}
                </Text>

                <Text size="sm" mt={4}>
                  Pedido por: <strong>{request.requestedBy}</strong>
                </Text>

                {request.description && (
                  <Text size="sm" mt={4}>
                    Descrição: {request.description}
                  </Text>
                )}
              </Timeline.Item>
            );

          return null;
        })}
      </Timeline>
    </Box>
  );
};

export default RequestList;
