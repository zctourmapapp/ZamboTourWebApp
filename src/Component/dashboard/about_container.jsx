import { useEffect, useState } from "react";
import { Box, Heading, Wrap, WrapItem, Text } from "@chakra-ui/react";
import useDeveloperHook from "../../Hooks/useDeveloperHook";
import DeveloperCard from "../DeveloperCard";

const AboutContainer = () => {
  const [requestMessage, setRequestMessage] = useState("");
  const { developers, fetchDevelopers } = useDeveloperHook();
  const [fetch, setFetch] = useState(true);

  const handleFetch = async () => {
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
    });
  };

  useEffect(() => {
    if (fetch) {
      handleFetch();
    }

    return () => setFetch(false);
  }, []);

  return (
    <Box
      m="auto"
      h="inherit"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      rowGap={10}
    >
      <Box w="100%" textAlign="center">
        <Heading size="lg">About Us</Heading>
      </Box>
      <Box w="100%" textAlign="center" pl={40} pr={40}>
        <Text size="md">
          Zamboanga City Tourism Web App is a comprehensive platform created by
          a team of passionate developers and travel enthusiasts. Our mission is
          to promote and showcase the captivating beauty and rich cultural
          heritage of Zamboanga City. Through our user-friendly web app, we
          provide a virtual journey that allows visitors to explore the city's
          landmarks, festivals, beaches, and cuisine. We believe in the power of
          technology to connect people with extraordinary places, and our
          platform aims to be a go-to resource for both locals and travelers
          seeking to discover the wonders of Zamboanga City. Join us on this
          exciting journey of exploration and celebration of Zamboanga City's
          vibrant spirit. Welcome to Zamboanga City Tourism Web App!
        </Text>
      </Box>
      <Box w="100%" textAlign="center">
        <Heading size="md" letterSpacing={5} color="gray">
          DEVELOPERS
        </Heading>
      </Box>
      <Box display="flex" justifyContent="center">
        <Wrap spacing={10} justify="center" align="start" mx="-2" p={5}>
          {developers.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default AboutContainer;
