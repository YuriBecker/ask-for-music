import { Box, Tabs } from "@mantine/core";
import Options from "components/Options";
import RequestList from "components/RequestList";
import RequestSong from "components/RequestSong";
import { Music, Playlist, Settings } from "tabler-icons-react";

const ListenerAuthenticated = () => {
  return (
    <Box pt="24px" style={{ height: "calc(100vh - 24px)" }}>
      <Tabs position="center" color={"primary"}>
        <Tabs.Tab label="Pedir Música" icon={<Music size={20} />}>
          <RequestSong />
        </Tabs.Tab>

        <Tabs.Tab label="Pedidos" icon={<Playlist size={20} />}>
          <RequestList />
        </Tabs.Tab>

        <Tabs.Tab label="Opções" icon={<Settings size={20} />}>
          <Options />
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
};

export default ListenerAuthenticated;
