import "swagger-ui-react/swagger-ui.css";
import spec from "public/swagger.json";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const SwaggerPage = () => <SwaggerUI spec={spec} />;

export const getStaticProps = () => {
  return {
    props: {
      isSwaggerPage: true,
    },
  };
};

export default SwaggerPage;
