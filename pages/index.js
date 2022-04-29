import { Text, Transition, useMantineTheme } from "@mantine/core";
import InstallButton from "components/InstallButton";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const theme = useMantineTheme();

  useEffect(() => {
    setIsMounted(true);
    setShowInstallButton(true);
  }, []);

  return (
    <main>
      <Transition
        mounted={isMounted}
        transition="slide-left"
        duration={700}
        timingFunction="ease"
      >
        {(styles) => (
          <Text
            style={styles}
            component="h1"
            align="center"
            variant="gradient"
            gradient={{
              from: theme.colors.grape[6],
              to: theme.colors.violet[6],
              deg: 90,
            }}
            weight={700}
            sx={{ fontSize: "2.5rem", marginBottom: "1rem" }}
          >
            Pede Música
          </Text>
        )}
      </Transition>

      <Transition
        mounted={showInstallButton}
        transition="slide-right"
        duration={700}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <InstallButton onClose={() => setShowInstallButton(false)} />
          </div>
        )}
      </Transition>
    </main>
  );
}
