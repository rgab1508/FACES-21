import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

export default function VideoBackground() {
  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.getElementById("videoBackground").autoplay = false;
    }
    window.onresize = () => {
      if (window.innerWidth <= 768) {
        document.getElementById("videoBackground").autoplay = false;
        document.getElementById("videoBackground").pause();
      }
    };
  }, []);

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        as="video"
        id="videoBackground"
        display={{ base: "none", md: "block" }}
        autoPlay={true}
        loop
        zIndex="-1"
        position="fixed"
        controls={false}
        muted
        src="NatureVideoTest.mp4"
        objectFit="cover"
      />
      <Box
        w="100%"
        h="100vh"
        as="img"
        display={{ base: "block", md: "none" }}
        zIndex="-1"
        position="fixed"
        src="poster.jpeg"
        objectFit="cover"
      />
    </>
  );
}
