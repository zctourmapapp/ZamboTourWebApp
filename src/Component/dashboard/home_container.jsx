import { Box, Center, Heading, Image, Text } from "@chakra-ui/react";
import LogoFront from "../../assets/Tour/logofront.jpg";

const HomeContainer = () => {
  return (
    <Box w="inherit" h="inherit" display="flex">
      <Box flex={1} m="auto">
        <Center>
          <Box w="45rem" h="20rem" ml="10rem">
            <Heading color="orange" size="3xl">
              Explore, Discover, and Create Unforgetable Memories
            </Heading>
            <Text mt="5">
              Visit the Asias Latin City, various beach and tourist spots,
              <br />
              experience the local life experience the culture of Zamboangueñous
            </Text>
          </Box>
        </Center>
      </Box>
      <Box flex={1} m="auto">
        <Image src={LogoFront} w="65rem" />
      </Box>
    </Box>
  );
};

export default HomeContainer;
