import { Box, Flex, Wrap } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DeveloperCard from "../../Component/DeveloperCard";
import useDeveloperHook from "../../Hooks/useDeveloperHook";
import useThemeHook from "../../Hooks/useThemeHook";

const Developer = () => {
  const { search } = useThemeHook();
  const { developers, fetchDevelopers } = useDeveloperHook();
  const [fetch, setFetch] = useState(true);

  function fetchDevelopersData() {
    fetchDevelopers((callback) => {
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

  const filteredDevelopers =
    search === ""
      ? developers
      : developers.filter((dev) =>
          dev.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

  useEffect(() => {
    if (fetch) {
      fetchDevelopersData();
    }

    return () => setFetch(false);
  }, []);

  return (
    <Box mt={5} ml={5}>
      <Flex p={2} pb={5}>
        <Wrap spacing="3rem" justify="start" align="start">
          {filteredDevelopers.map((dev, index) => (
            <DeveloperCard key={index} {...dev} />
          ))}
        </Wrap>
      </Flex>
    </Box>
  );
};

export default Developer;
