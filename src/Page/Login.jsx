import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Heading,
  Input,
  FormControl,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdVisibilityOff, MdVisibility } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import logo from "../assets/Tour/logo.svg";
import useUserHook from "../Hooks/useUserHook";

const Login = () => {
  const { user, signIn } = useUserHook();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [processing, setProcessing] = useState(false);
  const [color, setColor] = useState("red");

  function resetStates() {
    setEmail("");
    setPassword("");
  }

  function handleSignIn(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      return;
    }
    setProcessing(true);

    const credentials = {
      email: email,
      password: password,
    };

    signIn(credentials, (callback) => {
      switch (callback) {
        case "success":
          navigate("/");
          resetStates();
          break;
        case "pending":
          setMessage("Please wait for account approval.");
          resetStates();
          break;
        case "auth/invalid-email":
          setMessage("Invalid email address.");
          break;
        case "auth/user-disabled":
          setMessage("This account has been disabled.");
          break;
        case "auth/user-not-found":
          setMessage("Account doesn't exist.");
        case "auth/wrong-password":
          setMessage("Invalid email or password.");
          setPassword("");
          break;
        default:
          setMessage("An unknown error occurred. Please try again.");
      }
      setProcessing(false);
    });
  }

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleRecover = (e) => {
    e.preventDefault();
    navigate("/recover");
  };

  const handleVisible = () => {
    setVisible(!visible);
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={"30rem"}
        h={"35rem"}
        bg="white"
        rounded={10}
        boxShadow="2xl"
        p={8}
      >
        <Heading
          display="flex"
          columnGap={5}
          alignItems="center"
          color="orange"
          size="lg"
          mt={5}
        >
          <Image w={"5rem"} src={logo} /> Zambo Tour
        </Heading>

        <Box mt={5}>
          <Box w="100%" h="2rem">
            <Text color={color}>{message}</Text>
          </Box>
          <FormControl mt={10}>
            <InputGroup>
              <InputLeftElement color="primary.900">
                <MdEmail size={20} />
              </InputLeftElement>
              <Input
                placeholder="Email"
                focusBorderColor="primary.800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mt={5}>
            <InputGroup>
              <InputLeftElement color="primary.900">
                <FaLock size={20} />
              </InputLeftElement>
              <Input
                type={inputType}
                placeholder="Password"
                focusBorderColor="primary.800"
                color="secondary.900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement
                children={
                  <IconButton
                    bg="transparent"
                    color="gray"
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    icon={
                      visible ? (
                        <MdVisibilityOff size={25} />
                      ) : (
                        <MdVisibility size={25} />
                      )
                    }
                    onClick={(_) => handleVisible()}
                  />
                }
              />
            </InputGroup>
          </FormControl>
          <Button
            w="100%"
            mt={5}
            fontWeight={400}
            bg="transparent"
            color="gray"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            onClick={(e) => handleRecover(e)}
          >
            Forgot password?
          </Button>
          <Button
            w="100%"
            isLoading={processing}
            loadingText="Signing in"
            mt={5}
            bg="primary.900"
            color="white"
            onClick={(e) => handleSignIn(e)}
          >
            Login
          </Button>
          <Button w="100%" mt={5} onClick={(e) => handleBack(e)}>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
