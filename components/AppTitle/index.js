import { Text, Transition, useMantineTheme } from "@mantine/core";

export default function AppTitle({ isMounted }) {
  const theme = useMantineTheme();

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
            from: theme.colors.grape[6],
            to: theme.colors.violet[6],
            deg: 90,
          }}
          weight={700}
          sx={{ fontSize: "2.5rem" }}
          my="md"
        >
          Pede Música
        </Text>
      )}
    </Transition>
  );
}
