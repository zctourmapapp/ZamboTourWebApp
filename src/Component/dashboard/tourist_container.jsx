import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Image,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import useTourismHook from "../../Hooks/useTourismHook";
import CardComponent from "../CardComponent";

const TouristContainer = () => {
  const { tourismLimited, fetchTourismLimited } = useTourismHook();
  const [fetch, setFetch] = useState(true);

  function fetchTourismLimitedData() {
    fetchTourismLimited((callback) => {
      switch (callback) {
        case "cancelled":
          setRequestMessage("Request has been canceled.");
          break;
        case "deadline-exceeded":
          setRequestMessage(
            "Request timeout. Please check your internet connection."
          );
          break;
        case "resource-exhausted":
          setRequestMessage("To Many request.");
          break;
        case "failed-precondition":
          setRequestMessage(
            "Request format is wrong. Report developer for a bug."
          );
          break;
        case "unavailable":
          setRequestMessage("Service temporarily un available");
          break;
        case "internal":
          setRequestMessage("Something went wrong.");
          break;
        case "permission-denied":
          setRequestMessage("Un authorized access.");
          break;
      }
    });
  }

  useEffect(() => {
    if (fetch) {
      fetchTourismLimitedData();
    }

    return () => setFetch(false);
  }, []);

  return (
    <Box
      w="100%"
      h="inherit"
      m="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      rowGap={10}
      overflow="hidden"
    >
      <Box w="100%" textAlign="center">
        <Heading size="lg">More Visited Places</Heading>
      </Box>
      <Center>
        <Box w="90%" mt={5} p={5}>
          <Wrap spacing={10} justify="center" overflow="visible">
            {tourismLimited.map((tour, index) => {
              return <CardComponent key={index} {...tour} />;
            })}
          </Wrap>
        </Box>
      </Center>
      <Box w="100%" textAlign="center">
        <Text size="md">
          Experience the timeless allure of Latin cities, where vibrant
          cultures, captivating history, and irresistible charm come together to
          create an unforgettable urban adventure
        </Text>
      </Box>
    </Box>
  );
};

export default TouristContainer;
