import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { User } from "../types/User";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

// Chakra
import {
  Box,
  Heading,
  Text,
  Badge,
  Stack,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const users = useSelector((state: RootState) => state.users.users);

  const [user, setUser] = useState<User | null>(null);

  const cardBg = useColorModeValue("white", "gray.700");
  const pageBg = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    if (!id) return;
    const foundUser = users.find((u) => u.id === parseInt(id));
    setUser(foundUser || null);
  }, [id, users]);

  if (!user) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={pageBg}>
        <Text color="red.500" fontSize="lg">
          User not found.
        </Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bg={pageBg} py={10} px={4}>
      <Flex direction="column" maxW="600px" mx="auto">
        <Heading mb={6} textAlign="center" color="blue.600">
          User Details
        </Heading>

        <Box
          bg={cardBg}
          p={6}
          borderRadius="xl"
          boxShadow="lg"
          mb={6}
          transition="all 0.2s"
          _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
        >
          <Stack spacing={3}>
            <Text>
              <strong>Name:</strong> {user.name}
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
            <Text>
              <strong>Phone:</strong> {user.phone}
            </Text>
            <Text>
              <strong>Website:</strong>{" "}
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </Text>
            <Badge colorScheme="blue" fontSize="0.9em" width="fit-content">
              {user.company.name}
            </Badge>
            <Text>
              <strong>Address:</strong> {user.address.street}, {user.address.suite},{" "}
              {user.address.city}, {user.address.zipcode}
            </Text>
          </Stack>
        </Box>

        <Button
          as={Link}
          to="/"
          colorScheme="purple"
          alignSelf="flex-start"
        >
          ← Back to Users
        </Button>
      </Flex>
    </Box>
  );
};

export default UserDetailsPage;
