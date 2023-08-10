import { Icon, Stack, Text } from "@chakra-ui/react";
import { AiOutlineCloudServer } from "react-icons/ai";

export const Home = () => (
  <Stack align="center" justify="center">
    <Text
      textAlign="center"
      fontFamily="Forum, sans-serif"
      fontSize="6em"
      fontWeight="800"
      bgColor="olive.100"
      p={5}
      pr={10}
      borderRadius="lg"
    >
      <Icon m={4} verticalAlign="top" as={AiOutlineCloudServer} />
      Calendario Programador
    </Text> 
  </Stack>
);
