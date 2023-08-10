import { Box, Flex, HStack, Icon, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineCloudServer } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Links = ["Events"];

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded="md"
    color="olive.200"
    _hover={{
      textDecoration: "none",
      color: "olive.500",
    }}
    to={to}
  >
    {children}
  </Link>
);

export const Navbar = () => (
  <Box bg="gray.900" px={4}>
    <Flex h={16} alignItems="center" justify="space-between">
      <HStack spacing={8} alignItems="center">
        <NavLink to="/">
          <Icon w={8} h={8} as={AiOutlineCloudServer} />
        </NavLink>
        <HStack as="nav" spacing={4}>
          {Links.map((link) => (
            <NavLink key={link} to={`/${link}`}>
              {link}
            </NavLink>
          ))}
        </HStack>
      </HStack>
    </Flex>
  </Box>
);
