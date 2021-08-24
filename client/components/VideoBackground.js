import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const windowRef = useRef();

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

  // function handleScroll(event) {
  //   console.log(event);
  //   // if(windowRef.current){
  //   //   window
  //   // }
  // }

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        as="video"
        ref={windowRef}
        id="videoBackground"
        display={{ base: "none", md: "block" }}
        autoPlay={true}
        loop
        zIndex="-1"
        position="fixed"
        controls={false}
        muted
        src="1comp.mp4"
        objectFit="cover"
      />
      <Box
        w="100%"
        h="100vh"
        as="img"
        display={{ base: "block", md: "none" }}
        zIndex="-1"
        position="fixed"
        src="poster.png"
        objectFit="cover"
      />
    </>
  );
}
