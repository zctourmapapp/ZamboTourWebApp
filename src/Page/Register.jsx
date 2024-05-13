import { useState } from "react";
import {
  Box,
  Button,
  Image,
  Heading,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import logo from "../assets/Tour/logo.svg";
import userUserHook from "../Hooks/useUserHook.js";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = userUserHook();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleC, setVisibleC] = useState(false);
  const [message, setMessage] = useState("");
  const [processingSubmit, setProcessingSubmit] = useState(false);
  const [color, setColor] = useState("red");

  function resetStates() {
    setFname("");
    setLname("");
    setContact("");
    setEmail("");
    setPassword("");
    setVPassword("");
  }

  function handleSignUp(e) {
    e.preventDefault();
    setProcessingSubmit(true);

    const userDetails = {
      first_name: fname,
      last_name: lname,
      contact: contact,
      email: email,
      status: "Pending",
      isApproved: false,
    };

    signUp(userDetails, password, (feedback) => {
      switch (feedback) {
        case "success":
          resetStates();
          Swal.fire(
            "Account registered!",
            "Please wait for approval",
            "success"
          );
          break;
        case "auth/email-already-in-use":
          setMessage("Email address is already in use.");
          break;
        case "auth/invalid-email":
          setMessage("Invalid email address.");
          break;
        case "auth/operation-not-allowed":
          setMessage("Sign-up operation is not allowed.");
          break;
        case "auth/weak-password":
          setMessage("Password is too weak. Choose a stronger password.");
          break;
        case "auth/missing-email":
          setMessage("Please provide an email address.");
          break;
        default:
          setMessage("An unknown error occurred. Please try again.");
      }
      setProcessingSubmit(false);
    });
  }

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
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
          h={"43rem"}
          bg="white"
          rounded={10}
          boxShadow="2xl"
          p={5}
        >
          <Heading
            display="flex"
            columnGap={5}
            alignItems="center"
            color="orange"
            size="lg"
            mt={5}
          >
            <Image w={"6rem"} src={logo} /> Zambo Tour
          </Heading>
          <Box mt={5}>
            <Box w="100%" h="2rem">
              <Text color={color}>{message}</Text>
            </Box>
            <FormControl mt={2}>
              <InputGroup>
                <Input
                  placeholder="First name"
                  focusBorderColor="primary.800"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={5}>
              <InputGroup>
                <Input
                  placeholder="Last name"
                  focusBorderColor="primary.800"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={5}>
              <InputGroup>
                <Input
                  placeholder="Contact"
                  focusBorderColor="primary.800"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={5}>
              <InputGroup>
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
                <Input
                  type={visible ? "text" : "password"}
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
                      onClick={(_) => setVisible(!visible)}
                    />
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={5}>
              <InputGroup>
                <Input
                  type={visibleC ? "text" : "password"}
                  placeholder="Confirm password"
                  focusBorderColor="primary.800"
                  color="secondary.900"
                  value={vpassword}
                  onChange={(e) => setVPassword(e.target.value)}
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
                      onClick={(_) => setVisibleC(!visible)}
                    />
                  }
                />
              </InputGroup>
            </FormControl>
            <Button
              w="100%"
              isLoading={processingSubmit}
              loadingText="Processing"
              mt={5}
              bg="primary.900"
              color="white"
              onClick={(e) => handleSignUp(e)}
            >
              Register
            </Button>
            <Button w="100%" mt={5} onClick={(e) => handleBack(e)}>
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
