import { Box, Flex, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../Component/card";
import useTourismHook from "../../Hooks/useTourismHook";
import useThemeHook from "../../Hooks/useThemeHook";

const TouristSpot = () => {
  const { search } = useThemeHook();
  const { tourisms, fetchTourism } = useTourismHook();
  const [fetch, setFetch] = useState(true);

  function fetchTourismData() {
    fetchTourism((callback) => {
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

  const filteredTourisms =
    search === ""
      ? tourisms
      : tourisms.filter((tourism) =>
          tourism.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

  useEffect(() => {
    if (fetch) {
      fetchTourismData();
    }

    return () => setFetch(false);
  }, []);

  return (
    <Box h="inherit" mt={5} ml={5}>
      <Flex>
        <Wrap spacing="5" justify="start" align="start">
          {filteredTourisms.map((tourism, index) => (
            <Card key={index} {...tourism} />
          ))}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default TouristSpot;
