import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import MapContainer from "../../Component/map_container";

const TouristSpotView = (props) => {
  const location = useLocation();
  const [data, setData] = useState(location.state);

  return (
    <Box w="100%" display="flex">
      <Box flex={3}>
        <Box with={"100%"} backgroundColor="red">
          <Box h="25rem" overflow="hidden">
            <Image src={data.imageUrl} width="100%" />
          </Box>
        </Box>
      </Box>
      <Box flex={1}>
        <MapContainer />
      </Box>
    </Box>
  );
};

export default TouristSpotView;
