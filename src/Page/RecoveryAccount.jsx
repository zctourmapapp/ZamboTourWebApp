import { useState } from "react";
import {
  Box,
  Button,
  Image,
  Heading,
  Input,
  FormControl,
  InputLeftElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import useUserHook from "../Hooks/useUserHook";
import Swal from "sweetalert2";
import logo from "../assets/Tour/logo.svg";

const RecoveryAccount = () => {
  const navigate = useNavigate();
  const { sendRecoveryLink } = useUserHook();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [color, setColor] = useState("red");

  function handleSendRecoveryLink(e) {
    e.preventDefault();

    if (email === "") return;

    setProcessing(true);

    sendRecoveryLink(email, (callback) => {
      switch (callback) {
        case "success":
          Swal.fire("Sent!", "Please check your email", "success");
          setEmail("");
          break;
        case "auth/invalid-email":
          setMessage("Invalid email address.");
          break;
        case "auth/user-not-found":
          setMessage("User not found. Please check the email address.");
          break;
        case "auth/missing-android-pkg-name":
          setMessage("Android package name is missing.");
          break;
        // Add more cases for other error codes as needed
        default:
          setMessage("An unknown error occurred. Please try again.");
      }
      setProcessing(false);
    });
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/signin");
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
        h={"33rem"}
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
          <Box w="100%" h="2rem" textAlign="center">
            <Text>
              A recovery link will be sent to your email.
              <br /> link the link to change you password account.
            </Text>
          </Box>
          <Box w="100%" h="2rem" mt={5} color="darkred" textAlign="center">
            <Text color={color}> {message}</Text>
          </Box>
          <FormControl mt={6}>
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
          <Button
            w="100%"
            isLoading={processing}
            loadingText="Sending"
            mt="3rem"
            bg="primary.900"
            color="white"
            onClick={(e) => handleSendRecoveryLink(e)}
          >
            Send Recovery Link
          </Button>
          <Button w="100%" mt={5} onClick={(e) => handleSignIn(e)}>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RecoveryAccount;
