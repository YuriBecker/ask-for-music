import { Alert, Button } from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import { Download } from "tabler-icons-react";

const InstallButton = ({ onClose }) => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();

    if (!promptInstall) return;

    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <Alert
      icon={<Download size={30} />}
      title="Install the app and get a better experience"
      color="indigo"
      radius="md"
      variant="filled"
      styles={{
        icon: { width: "30px", marginTop: "6px" },
        closeButton: { width: "20px", alignSelf: "flex-start" },
      }}
      withCloseButton
      closeButtonLabel="Close install alert"
      onClose={onClose}
    >
      <Button variant="white" onClick={onClick} size="sm">
        Click here to install{" "}
      </Button>
    </Alert>
  );
};

export default InstallButton;
