import { Box, Button, Stack, Title, Transition } from "@mantine/core";
import AppTitle from "components/AppTitle";
import InstallButton from "components/InstallButton";
import useIsMounted from "hooks/isMounted";
import { useEffect, useState } from "react";

export default function Home() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    setShowInstallButton(true);
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
        px="md"
      >
        <AppTitle />

        <Transition
          mounted={isMounted}
          transition="slide-right"
          duration={700}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Stack my="lg">
                <Button
                  variant="gradient"
                  size="lg"
                  gradient={{ from: "violet", to: "grape" }}
                >
                  Sou o Músico
                </Button>

                <Button
                  variant="gradient"
                  size="lg"
                  gradient={{ from: "grape", to: "violet" }}
                >
                  Sou um Ouvinte
                </Button>
              </Stack>
            </div>
          )}
        </Transition>

        <Transition
          mounted={showInstallButton}
          transition="slide-up"
          duration={700}
          timingFunction="ease"
        >
          {(styles) => (
            <Box
              style={styles}
              sx={{
                position: "absolute",
                width: "100%",
                bottom: 0,
                left: 0,
              }}
            >
              <InstallButton onClose={() => setShowInstallButton(false)} />
            </Box>
          )}
        </Transition>
      </Box>
    </>
  );
}
