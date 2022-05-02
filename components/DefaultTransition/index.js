import { Box, Transition } from "@mantine/core";
import useIsMounted from "hooks/isMounted";

const DefaultTransition = ({ children }) => {
  const isMounted = useIsMounted();

  return (
    <Transition transition={"slide-left"} mounted={isMounted}>
      {(transitionStyles) => (
        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
          style={transitionStyles}
        >
          {children}
        </Box>
      )}
    </Transition>
  );
};

export default DefaultTransition;
