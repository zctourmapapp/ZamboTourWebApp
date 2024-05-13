import { useEffect, useState } from "react";
import { Box, Center, Heading, Wrap, Text } from "@chakra-ui/react";
import useHotelHook from "../../Hooks/useHotelHook";
import CardComponent from "../CardComponent";

const HotelContainer = () => {
  const { hotelLimited, fetchHotelLimited } = useHotelHook();
  const [fetch, setFetch] = useState(true);

  function fetchHotelLimitedData() {
    fetchHotelLimited((callback) => {
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
      setFetch(false);
    });
  }

  useEffect(() => {
    if (fetch) {
      fetchHotelLimitedData();
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
        <Heading size="lg">Indulge in Latin city's hotel enchantment.</Heading>
      </Box>
      <Center>
        <Box w="90%" mt={5} p={5}>
          <Wrap spacing={10} justify="center" overflow="visible">
            {hotelLimited.map((hotel, index) => {
              return <CardComponent key={index} {...hotel} />;
            })}
          </Wrap>
        </Box>
      </Center>
      <Box w="100%" textAlign="center">
        <Text size="md">
          Experience the essence of Latin cities in our hotels, where refined
          luxury, warm hospitality, and captivating ambiance intertwine to
          create an unforgettable retreat.
        </Text>
      </Box>
    </Box>
  );
};

export default HotelContainer;
