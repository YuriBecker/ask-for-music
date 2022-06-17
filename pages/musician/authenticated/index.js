import { Box, Tabs } from "@mantine/core";
import withAuth from "components/HOC/withAuth";
import MySongs from "components/MySongs";
import Options from "components/Options";
import RequestList from "components/RequestList";
import React from "react";
import { Music, Playlist, Settings } from "tabler-icons-react";

const MusicianAuthenticated = () => {
  return (
    <Box pt="24px" style={{ height: "calc(100vh - 24px)" }}>
      <Tabs position="center" color={"primary"}>
        <Tabs.Tab label="Músicas" icon={<Music size={20} />}>
          <MySongs />
        </Tabs.Tab>

        <Tabs.Tab label="Pedidos" icon={<Playlist size={20} />}>
          <RequestList isMusician />
        </Tabs.Tab>

        <Tabs.Tab label="Opções" icon={<Settings size={20} />}>
          <Options />
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
};

export default withAuth(MusicianAuthenticated);
