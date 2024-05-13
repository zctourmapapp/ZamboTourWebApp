import { Box, Heading, Image, WrapItem, Text } from "@chakra-ui/react";

const CardComponent = ({ title, imageUrl, location_name, description }) => {
  return (
    <WrapItem>
      <Box
        w="30rem"
        h="30rem"
        overflow="hidden"
        backgroundColor="white"
        boxShadow="lg"
        p={3}
        pb={5}
        rounded={10}
      >
        <Box overflow={"hidden"} rounded={10}>
          <Image src={imageUrl} name="" w={500} h={300} fit="cover" />
        </Box>
        <Heading size="md" mt={3}>
          {title}
        </Heading>
        <Text fontSize={14} mt={2}>
          {description.split(".")[0]}
        </Text>
        <Text fontSize={14} mt={2}>
          {location_name}
        </Text>
      </Box>
    </WrapItem>
  );
};

export default CardComponent;
