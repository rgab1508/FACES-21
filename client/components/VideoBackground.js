import { Box } from "@chakra-ui/react";

export default function VideoBackground() {
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        as="video"
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
