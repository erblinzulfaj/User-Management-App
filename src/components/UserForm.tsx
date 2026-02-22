import { useState } from "react";
import type { User } from "../types/User";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
} from "@chakra-ui/react";

interface Props {
  onAdd: (user: Omit<User, "id">) => void;
}

const UserForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isNameError = touched && name.trim() === "";
  const isEmailError = touched && email.trim() === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!name.trim() || !email.trim()) return;

onAdd({
      name,
      email,
      phone: "",
      website: "",
      address: { street: "", suite: "", city: "", zipcode: "" },
      company: { name: "", catchPhrase: "" },
    });


    setName("");
    setEmail("");
    setTouched(false);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      borderRadius="xl"
      boxShadow="md"
      bg="white"
    >
      <Heading size="md" mb={4} color="blue.600">
        Add New User
      </Heading>

      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={isNameError}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            focusBorderColor="blue.400"
          />
          <FormErrorMessage>Name is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={isEmailError}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="blue.400"
          />
          <FormErrorMessage>Email is required.</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="md"
          width="full"
        >
          Add User
        </Button>
      </VStack>
    </Box>
  );
};

export default UserForm;
