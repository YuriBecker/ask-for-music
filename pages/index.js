import { Transition } from "@mantine/core";
import AppTitle from "components/AppTitle";
import InstallButton from "components/InstallButton";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setShowInstallButton(true);
  }, []);

  return (
    <main>
      <AppTitle isMounted={isMounted} />

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
