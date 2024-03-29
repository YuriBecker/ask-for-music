import { useStore } from "hooks/useStore";
import Home from "pages";

const withAuth = (Component) => {
  const Auth = (props) => {
    const musicianIsAuth = useStore((state) => state.musicianIsAuth);

    // If user is not logged in, return login component
    if (!musicianIsAuth) {
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

export default withAuth;
