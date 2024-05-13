import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import logo from "../assets/Tour/logo.svg";
import LogoFront from "../assets/Tour/logofront.jpg";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import TouristContainer from "../Component/dashboard/tourist_container";
import "../Style/Home.css";
import RestaurantContainer from "../Component/dashboard/restaurant_container";
import HotelContainer from "../Component/dashboard/hotel_container";
import AboutContainer from "../Component/dashboard/about_container";
import HomeContainer from "../Component/dashboard/home_container";

const ListComponent = ({ index, title, onClick, selected }) => {
  return (
    <ListItem
      _hover={{
        color: "#ff9d00c2",
      }}
      pl={4}
      pt={2}
      pr={4}
      pb={2}
      rounded={5}
      fontWeight={600}
      fontSize={20}
      color={selected === title ? "#ff9d00c2" : "gray"}
      onClick={() => onClick(title, index)}
    >
      {title}
    </ListItem>
  );
};

const Navigation = ({ navRef, children }) => {
  const navigate = useNavigate();

  const goTo = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <Box
      ref={navRef}
      w="100%"
      h="5rem"
      position="fixed"
      mt={0}
      zIndex={9999}
      bg="transparent"
      transition="background-color 0.3s ease-in-out"
    >
      <Flex
        justifyContent="space-around"
        mt={3}
        alignItems="center"
        className="navigator"
      >
        <Heading
          size="lg"
          fontFamily={"sans-serif, poppins"}
          display="flex"
          alignItems="center"
          columnGap={3}
          className="header"
        >
          <Image src={logo} w={"3.5rem"} />
          ZAMBO TOUR
        </Heading>
        <UnorderedList
          display="flex"
          fontSize={16}
          columnGap={8}
          listStyleType="none"
          mt={2}
          alignItems={"center"}
          cursor="pointer"
        >
          {children}
          <Button
            fontWeight={700}
            bg="transparent"
            rounded={25}
            color={"gray"}
            pl={7}
            pr={7}
            _hover={{
              bg: "white",
              color: "orange",
              boxShadow: "md",
            }}
            onClick={(e) => goTo(e, "/signup")}
          >
            Register
          </Button>
          <Button
            fontWeight={700}
            bg="orange"
            rounded={25}
            color={"white"}
            boxShadow="md"
            pl={7}
            pr={7}
            _hover={{
              bg: "orange",
            }}
            n
            onClick={(e) => goTo(e, "/signin")}
          >
            Sign In
          </Button>
        </UnorderedList>
      </Flex>
    </Box>
  );
};

const Container = ({ containerRef, children }) => {
  return (
    <Box ref={containerRef} h="inherit" display="flex">
      {children}
    </Box>
  );
};

const Home = () => {
  const [selected, setSelected] = useState("Home");
  const navRef = useRef(null);
  const containerRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleScrollTo = (hasBeenSelected, index) => {
    setSelected(hasBeenSelected);
    containerRefs[index].current.scrollIntoView({ behavior: "smooth" });
  };

  const styles = [
    {
      index: 0,
      title: "Home",
      component: <HomeContainer />,
    },
    {
      index: 1,
      title: "Tourist Spot",
      component: <TouristContainer />,
    },
    {
      index: 2,
      title: "Restaurant",
      component: <RestaurantContainer />,
    },
    {
      index: 3,
      title: "Accomodation",
      component: <HotelContainer />,
    },
    {
      index: 4,
      title: "About Us",
      component: <AboutContainer />,
    },
  ];

  const handleScroll = (e) => {
    const scrollDistance = e.target.scrollTop;

    if (scrollDistance > 90) {
      navRef.current.style.backgroundColor = "white";
      navRef.current.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    } else {
      navRef.current.style.backgroundColor = "transparent";
      navRef.current.style.boxShadow = "none";
    }

    const distances = containerRefs.map((ref) => {
      return Math.abs(
        ref.current.getBoundingClientRect().top - window.innerHeight / 2
      );
    });

    const minDistance = Math.min(...distances);
    const selectedIndex = distances.indexOf(minDistance);

    setSelected(styles[selectedIndex].title);
  };

  return (
    <Box>
      <Navigation
        navRef={navRef}
        children={
          <>
            {styles.map((value) => (
              <ListComponent
                key={value.index}
                {...value}
                selected={selected}
                onClick={handleScrollTo}
              />
            ))}
          </>
        }
      />
      <Box
        w="100%"
        h="100vh"
        position="relative"
        overflow="auto"
        onScroll={handleScroll}
      >
        {styles.map((value) => (
          <Container
            key={value.index}
            containerRef={containerRefs[value.index]}
          >
            {value.component}
          </Container>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
