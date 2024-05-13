import { Box, Text, Flex, Heading, Grid, GridItem } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import {
  MdOutlineModeOfTravel,
  MdRestaurantMenu,
  MdOutlineHotel,
} from "react-icons/md";

const cardData = [
  {
    key: 0,
    name: "Registered Users",
    value: 100,
    icon: <FaUsers size={40} />,
    color: "primary.900",
  },
  {
    key: 0,
    name: "Tourist Spot",
    value: 125,
    icon: <MdOutlineModeOfTravel size={40} />,
    color: "green",
  },
  {
    key: 0,
    name: "Restaurant",
    value: 131,
    icon: <MdRestaurantMenu size={40} />,
    color: "teal",
  },
  {
    key: 0,
    name: "Hotel",
    value: 142,
    icon: <MdOutlineHotel size={40} />,
    color: "brown",
  },
];

const DashboardCardComponent = ({
  data: { key, name, value, icon, color },
}) => {
  return (
    <GridItem w="inherit" colSpan={[12, 6, 3, 3]}>
      <Box h="6rem" bg="light.900" key={key} boxShadow="lg " p={5} rounded={5}>
        <Flex columnGap={10} alignItems="center">
          <Box color={color}>{icon}</Box>
          <Box>
            <Heading letterSpacing={1} color="secondary.900" size="md">
              {name}
            </Heading>
            <Text>Total of {value} </Text>
          </Box>
        </Flex>
      </Box>
    </GridItem>
  );
};

const CardListComponent = () => {
  return (
    <Box w="inherit">
      <Grid
        templateRows={[
          "repeat(4,1fr)",
          "repeat(2,1fr)",
          "repeat(2,1fr)",
          "repeat(1,1fr)",
        ]}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(6, 1fr)",
          "repeat(12, 1fr)",
        ]}
        gap={5}
      >
        {cardData.map((data) => (
          <DashboardCardComponent data={data} />
        ))}
      </Grid>
    </Box>
  );
};

const AreaChartComponent = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      rv: 2200,
      sv: 2700,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      rv: 3000,
      sv: 1400,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      rv: 3000,
      sv: 1400,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      rv: 3000,
      sv: 1400,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      rv: 2000,
      sv: 1400,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      rv: 2200,
      sv: 2700,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      rv: 3490,
      sv: 1400,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3000,
      pv: 1398,
      rv: 3000,
      sv: 1400,
      amt: 2210,
    },
    {
      name: "Sep",
      uv: 2000,
      pv: 9800,
      rv: 3000,
      sv: 1400,
      amt: 2290,
    },
    {
      name: "Oct",
      uv: 2780,
      pv: 3908,
      rv: 3490,
      sv: 1400,
      amt: 2000,
    },
    {
      name: "Nov",
      uv: 1890,
      pv: 4800,
      rv: 3000,
      sv: 1400,
      amt: 2181,
    },
    {
      name: "Dec",
      uv: 3000,
      pv: 1398,
      rv: 3000,
      sv: 1400,
      amt: 2210,
    },
  ];
  return (
    <Box w="inherit" p={5} bg="light.900" boxShadow="xl" rounded={8} mt={12}>
      <LineChart
        width={730}
        height={350}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffb43dc7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffb43dba" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#008000bf" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00800099" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#008080c9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#008080bf" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a52a2ac2" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#a52a2aa6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Line
          type="monotone"
          dataKey="rv"
          stroke="#008080"
          fillOpacity={1}
          fill="url(#colorRv)"
        />
        <Line
          type="monotone"
          dataKey="sv"
          stroke="#a52a2a"
          fillOpacity={1}
          fill="url(#colorSv)"
        />
      </LineChart>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <Box>
      <CardListComponent />
      <Box display="flex">
        <AreaChartComponent />
      </Box>
    </Box>
  );
};

export default Dashboard;
