import {
  Avatar,
  Box,
  Heading,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import useThemeHook from "../Hooks/useThemeHook";

const LayoutHeader = (props) => {
  const { title, search, setSearch } = useThemeHook();

  return (
    <Flex
      w="inherit"
      h="4rem"
      bg="#f1f1f1"
      p={5}
      pb={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex gap={5} alignItems="center">
        <IconButton
          bg="transparent"
          icon={
            !props.collapsed ? <HiMenu size={25} /> : <IoMdClose size={25} />
          }
          color="secondary.900"
          _hover={{ bg: "transparent", color: "secondary.900" }}
          _active={{ bg: "transparent", color: "secondary.900" }}
          onClick={(_) => props.handleCollapse()}
        />
        <Heading size="lg" color="#ffa500">
          {title}
        </Heading>
      </Flex>
      <Flex gap={5} alignItems="center">
        <Box
          bg="white"
          boxShadow="md"
          pl={2}
          pr={5}
          rounded={25}
          overflow="hidden"
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" size="20" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              variant="none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Avatar src="" name="T" size="md" />
      </Flex>
    </Flex>
  );
};

export default LayoutHeader;
