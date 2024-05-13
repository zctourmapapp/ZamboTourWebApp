import { Box, Flex, Heading, Wrap } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Card from "../../Component/card";
import useRestaurantHook from "../../Hooks/useRestaurantHook";
import useThemeHook from "../../Hooks/useThemeHook";

const Restaurant = () => {
  const { search } = useThemeHook();
  const { restaurant, fetchRestaurant } = useRestaurantHook();
  const [fetch, setFetch] = useState(true);

  function fetchRestaurantData() {
    fetchRestaurant((callback) => {
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

  const filteredRestaurants =
    search === ""
      ? restaurant
      : restaurant.filter((rest) =>
          rest.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

  useEffect(() => {
    if (fetch) {
      fetchRestaurantData();
    }

    return () => setFetch(false);
  }, []);

  return (
    <Box h="inherit" mt={5} ml={5}>
      <Flex>
        <Wrap spacing="5" justify="start" align="start">
          {filteredRestaurants.map((resta, index) => (
            <Card key={index} {...resta} />
          ))}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default Restaurant;
