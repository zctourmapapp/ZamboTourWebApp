import { Box, Flex, Wrap } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Card from "../../Component/card";
import useHotelHook from "../../Hooks/useHotelHook";
import useThemeHook from "../../Hooks/useThemeHook";

const Hotel = () => {
  const { search } = useThemeHook();
  const { hotels, fetchHotel } = useHotelHook();
  const [fetch, setFetch] = useState(true);
  const [hotel, setHotel] = useState([]);

  function fetchHotelData() {
    fetchHotel((callback) => {
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

  const filteredHotels =
    search === ""
      ? hotels
      : hotels.filter((rest) =>
          rest.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

  useEffect(() => {
    if (fetch) {
      fetchHotelData();
    }

    return () => setFetch(false);
  }, []);

  return (
    <Box h="inherit" mt={5} ml={5}>
      <Flex>
        <Wrap spacing="3rem" justify="start" align="start">
          {filteredHotels.map((hotel, index) => (
            <Card key={index} {...hotel} />
          ))}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default Hotel;
