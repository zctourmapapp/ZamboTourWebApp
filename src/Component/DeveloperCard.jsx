import { Box, Heading, Image, Text, WrapItem } from "@chakra-ui/react";
import { FaFacebookSquare, FaInstagramSquare, FaGithub } from "react-icons/fa";

const IconComponent = ({ href, color, children }) => {
  return (
    <Box w="2rem" color="gray" _hover={{ color: color, cursor: "pointer" }}>
      <a href={href} target="_blank">
        {children}
      </a>
    </Box>
  );
};

const DeveloperCard = ({ name, skills, url, fb, ig, git }) => {
  return (
    <WrapItem boxShadow="md" overflow="hidden">
      <Box
        backgroundColor="white"
        textAlign="center"
        rowGap={10}
        p={2}
        pb={5}
        rounded={12}
      >
        <Box position="relative" mb={2} rounded={10} overflow={"hidden"}>
          <Image src={url} name="" h={300} />
        </Box>
        <Heading size="md" letterSpacing={3}>
          {name}
        </Heading>
        <Text>{skills}</Text>
        <Box
          w="inherit"
          display="flex"
          justifyContent="center"
          columnGap={"3rem"}
          mt="1.5rem"
        >
          <IconComponent href={fb} color={"#1877f2"}>
            <FaFacebookSquare size="30" />
          </IconComponent>
          <IconComponent href={ig} color={"#fc6592"}>
            <FaInstagramSquare size="30" />
          </IconComponent>
          <IconComponent href={git} color={"#773fc7"}>
            <FaGithub size="30" />
          </IconComponent>
        </Box>
      </Box>
    </WrapItem>
  );
};

export default DeveloperCard;
