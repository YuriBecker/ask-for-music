import { Box, Button, Stack, Transition } from "@mantine/core";
import AppTitle from "components/AppTitle";
import InstallButton from "components/InstallButton";
import useIsMounted from "hooks/isMounted";
import Link from "next/link";
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
        sx={{
          height: "100%",
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
                <Link href="/musician" passHref>
                  <Button
                    component="a"
                    variant="gradient"
                    size="lg"
                    gradient={{ from: "violet", to: "grape" }}
                  >
                    Sou o Músico
                  </Button>
                </Link>

                <Link href="/listener" passHref>
                  <Button
                    component="a"
                    variant="gradient"
                    size="lg"
                    gradient={{ from: "grape", to: "violet" }}
                  >
                    Sou um Ouvinte
                  </Button>
                </Link>
              </Stack>
            </div>
          )}
        </Transition>

        <Transition
          mounted={showInstallButton}
          transition="slide-down"
          duration={700}
          timingFunction="ease"
        >
          {(styles) => (
            <Box
              style={{
                ...styles,
                position: "absolute",
                width: "100%",
                top: 0,
                left: 0,
              }}
              className="footer-install"
            >
              <InstallButton onClose={() => setShowInstallButton(false)} />
            </Box>
          )}
        </Transition>
      </Box>
    </>
  );
}
