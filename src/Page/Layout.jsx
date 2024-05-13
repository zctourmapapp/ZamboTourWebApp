import { Box, Heading, Image, Flex } from "@chakra-ui/react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import {
  MdOutlineModeOfTravel,
  MdRestaurantMenu,
  MdOutlineHotel,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import logo from "../assets/Tour/logo.svg";
import LayoutHeader from "../Component/LayoutHeader";
import useThemeHook from "../Hooks/useThemeHook";

import Dashboard from "./Dashboard";
import Hotel from "./Hotel/Hotel";
import HotelView from "./Hotel/HotelView";
import NewHotel from "./Hotel/NewHotel";
import DeletedHotel from "./Hotel/DeletedHotel";
import Developer from "./Developer/Developer";
import NewDeveloper from "./Developer/NewDeveloper";
import DeletedDeveloper from "./Developer/DeletedDeveloper";
import Restaurant from "./Restaurant/Restaurant";
import RestaurantView from "./Restaurant/RestaurantView";
import NewRestaurant from "./Restaurant/NewRestaurant";
import DeletedRestaurant from "./Restaurant/DeletedRestaurant";
import TouristSpot from "./Tourism/TouristSpot";
import TouristSpotView from "./Tourism/TouristSpotView";
import NewTouristSpot from "./Tourism/NewTouristSpot";
import DeletedTouristSpot from "./Tourism/DeletedTouristSpot";

const MenuItemComponent = (props) => {
  const navigate = useNavigate();
  const { setTitle } = useThemeHook();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    setTitle(props.name);
    navigate(path);
  };

  return (
    <MenuItem
      icon={
        <Box p={2} boxShadow="lg" bg="white" rounded={5}>
          {props.child}
        </Box>
      }
      onClick={(e) => handleNavigate(e, props.path)}
    >
      {props.name}
    </MenuItem>
  );
};

const MenuItemComponent2 = ({ root, name, path, icon }) => {
  const navigate = useNavigate();
  const { setTitle } = useThemeHook();

  const handleNavigate = (e) => {
    e.preventDefault();
    setTitle(name);
    navigate(`${root}/${path}`);
  };

  return (
    <MenuItem icon={icon} pl={5} onClick={(e) => handleNavigate(e)}>
      {name}
    </MenuItem>
  );
};

const SubMenuItemComponent = ({ children, name, root, icon }) => {
  const navigate = useNavigate();
  const { setTitle } = useThemeHook();

  const handleNavigate = (e) => {
    e.preventDefault();
    setTitle(name);
    navigate(root);
  };

  return (
    <SubMenu
      icon={
        <Box p={2} boxShadow="lg" bg="white" rounded={5}>
          {icon}
        </Box>
      }
      label={name}
      onClick={(e) => handleNavigate(e)}
    >
      {children}
    </SubMenu>
  );
};

const subPath = [
  {
    name: "New",
    path: "register",
    icon: <BsPlusCircle />,
  },
  {
    name: "Deleted",
    path: "deleted",
    icon: <BsTrash />,
  },
];

const SidebarComponent = () => {
  const routes = [
    {
      name: "Tourist Spot",
      icon: <MdOutlineModeOfTravel />,
      root: "tourist",
    },
    {
      name: "Restaurant",
      icon: <MdRestaurantMenu />,
      root: "restaurant",
    },
    {
      name: "Hotel",
      icon: <MdOutlineHotel />,
      root: "hotel",
    },
    {
      name: "Developer",
      icon: <MdOutlineHotel />,
      root: "developer",
    },
  ];

  return (
    <Sidebar breakPoint="lg" backgroundColor="white">
      <Menu>
        <MenuItem>
          <Flex columnGap={5} mt={5} alignItems="center">
            <Image src={logo} w="3rem" />
            <Heading size="md" color="primary.900">
              Zambo Tour
            </Heading>
          </Flex>
        </MenuItem>
        <Box h={"4rem"} />
        <MenuItemComponent name="Dashboard" path="/" child={<RxDashboard />} />
        {routes.map((route) => {
          return (
            <SubMenuItemComponent {...route}>
              {subPath.map((val) => {
                return (
                  <MenuItemComponent2
                    name={`${val.name} ${route.name}`}
                    path={val.path}
                    icon={val.icon}
                    root={route.root}
                  />
                );
              })}
            </SubMenuItemComponent>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

const Layout = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken } =
    useProSidebar();

  const handleCollapse = () => {
    if (broken) {
      toggleSidebar();
      return;
    }
    collapseSidebar();
  };

  const elements = [
    {
      components: [<TouristSpot />, <NewTouristSpot />, <DeletedTouristSpot />],
    },
    {
      components: [<Restaurant />, <NewRestaurant />, <DeletedRestaurant />],
    },
    {
      components: [<Hotel />, <NewHotel />, <DeletedHotel />],
    },
    {
      components: [<Developer />, <NewDeveloper />, <DeletedDeveloper />],
    },
  ];

  const viewsComponent = [
    <TouristSpotView />,
    <RestaurantView />,
    <HotelView />,
  ];

  const subStyles = ["/", "register", "deleted"];

  const styles = ["tourist", "restaurant", "hotel", "developer"];

  return (
    <Box w="100%" h="100vh">
      <Flex>
        <SidebarComponent collapsed={collapsed} toggled={toggled} />
        <Box w="100%" h="100vh" overflow="hidden">
          <LayoutHeader collapsed={collapsed} handleCollapse={handleCollapse} />
          <Box h="100%" overflow="auto" p={5} bg="rgba(0,0,0,0.05)">
            {
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {styles.map((style, outerIndex) => (
                  <Route
                    path={`/${style}/*`}
                    element={
                      <Routes>
                        {subStyles.map((subStyle, index) => (
                          <Route
                            path={subStyle}
                            element={elements[outerIndex].components[index]}
                          />
                        ))}
                      </Routes>
                    }
                  />
                ))}
                {viewsComponent.map((view, index) => (
                  <Route path={`${styles[index]}/view`} element={view} />
                ))}
              </Routes>
            }
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
