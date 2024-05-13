import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NewTouristSpot = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);

  return (
    <Box>
      <Text>{"New Tourism"}</Text>
    </Box>
  );
};

export default NewTouristSpot;
