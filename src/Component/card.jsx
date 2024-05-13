import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { AiFillStar, AiFillHeart } from "react-icons/ai";

const Card = ({ id, imageUrl, title, description, rating }) => {
  const navigate = useNavigate();

  const navigatePage = (e) => {
    e.preventDefault();
    navigate("view", { state: { id, imageUrl, title, description, rating } });
  };

  return (
    <WrapItem _hover={{ cursor: "pointer" }} rounded={13} overflow="hidden">
      <Box
        w="22rem"
        h="30rem"
        boxShadow="md"
        overflow="hidden"
        backgroundColor="white"
        onClick={(e) => handleNavigate(e)}
      >
        <Box w="22rem" h="15rem" position="relative" overflow="hidden">
          <Image src={imageUrl} name="" fit="contain" />
        </Box>
        <Box h="36%" p={5} overflow="hidden">
          <Heading size="md">{title}</Heading>
          <Text fontSize={12} mt={2}>
            {description}
          </Text>
        </Box>
        <Box
          w="100%"
          p={5}
          pt={3}
          display="flex"
          columnGap={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" columnGap={5}>
            <Box>
              <Flex columnGap={2} alignItems={"center"}>
                <AiFillStar size={30} color="orange" />
                <Text fontSize={16} fontWeight={600}>
                  {rating}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Flex columnGap={2} alignItems={"center"}>
                <AiFillHeart size={30} color="red" />
                <Text fontSize={16} fontWeight={600}>
                  {rating}
                </Text>
              </Flex>
            </Box>
          </Box>
          <Box>
            <Button
              w="6rem"
              backgroundColor="orange"
              boxShadow="lg"
              onClick={(e) => navigatePage(e)}
            >
              <Text fontWeight={600}>View</Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </WrapItem>
  );
};

export default Card;
