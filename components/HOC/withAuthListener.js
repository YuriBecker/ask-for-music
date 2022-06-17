import { useStore } from "hooks/useStore";
import Home from "pages";

const withAuthListener = (Component) => {
  const Auth = (props) => {
    const listenerName = useStore((state) => state.listenerName);

    // If user is not logged in, return login component
    if (!listenerName) {
      return <Home />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuthListener;
