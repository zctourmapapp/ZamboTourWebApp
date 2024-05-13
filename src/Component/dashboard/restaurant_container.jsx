import { useEffect, useState } from "react";
import { Box, Center, Heading, Wrap, Text } from "@chakra-ui/react";
import useRestaurantHook from "../../Hooks/useRestaurantHook";
import CardComponent from "../CardComponent";

const RestaurantContainer = () => {
  const { restaurantLimited, fetchRestaurantLimited } = useRestaurantHook();
  const [fetch, setFetch] = useState(true);

  function fetchRestaurantLimitedData() {
    fetchRestaurantLimited((callback) => {
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
      fetchRestaurantLimitedData();
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
        <Heading size="lg">Taste the Latin city's culinary magic.</Heading>
      </Box>
      <Center>
        <Box w="90%" mt={5} p={5}>
          <Wrap spacing={10} justify="center" overflow="visible">
            {restaurantLimited.map((res, index) => {
              return <CardComponent key={index} {...res} />;
            })}
          </Wrap>
        </Box>
      </Center>
      <Box w="100%" textAlign="center">
        <Text size="md">
          Indulge in the flavors of Latin cities, where culinary excellence,
          vibrant ingredients, and rich traditions converge to create a
          tantalizing dining experience you won't soon forget.
        </Text>
      </Box>
    </Box>
  );
};

export default RestaurantContainer;
