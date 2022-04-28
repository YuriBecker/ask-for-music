import { Text, Transition } from "@mantine/core";
import InstallButton from "components/InstallButton";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

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
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            weight={700}
            sx={{ fontSize: "2.5rem", marginBottom: "1rem" }}
          >
            Ask For Music
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
