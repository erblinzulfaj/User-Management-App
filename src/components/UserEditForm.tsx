import { useState } from "react";
import type { User } from "../types/User";
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface UserEditFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onCancel: () => void;
}

const UserEditForm = ({ user, onUpdate, onCancel }: UserEditFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required");
      return;
    }
    onUpdate({ ...user, name, email });
  };

  const modalBg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="rgba(0,0,0,0.5)"
      align="center"
      justify="center"
      zIndex={1000}
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg={modalBg}
        p={6}
        borderRadius="xl"
        minW={{ base: "90%", sm: "400px" }}
        boxShadow="lg"
      >
        <Heading size="md" mb={4}>
          Edit User
        </Heading>

        {error && (
          <Text color="red.500" mb={3}>
            {error}
          </Text>
        )}

        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb={3}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={5}
        />

        <Flex justify="space-between">
          <Button colorScheme="green" type="submit">
            Update
          </Button>
          <Button colorScheme="red" onClick={onCancel}>
            Cancel
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default UserEditForm;
