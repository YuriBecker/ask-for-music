import { Text, Transition } from "@mantine/core";
import useIsMounted from "hooks/isMounted";

export default function AppTitle() {
  const isMounted = useIsMounted();

  return (
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
            from: "grape",
            to: "violet",
            deg: 0,
          }}
          weight={700}
          sx={{ fontSize: "2.5rem", margin: 0 }}
        >
          Pede Música
        </Text>
      )}
    </Transition>
  );
}
