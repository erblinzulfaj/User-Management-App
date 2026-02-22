import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/User";

// Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setUsers, addUser, updateUser, deleteUser } from "../store/userSlice";

// Chakra
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Input,
  Badge,
  Spinner,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

import UserForm from "../components/UserForm";
import UserEditForm from "../components/UserEditForm";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const cardBg = useColorModeValue("white", "gray.700");
  const pageBg = useColorModeValue(
    "linear(to-r, blue.50, purple.50)",
    "gray.800"
  );

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data: User[] = await res.json();
        dispatch(setUsers(data));
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [dispatch]);

  // Handlers
  const handleAddUser = (newUser: Omit<User, "id">) => {
    dispatch(addUser(newUser));
    setShowAddForm(false);
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleUpdateUser = (updatedUser: User) => {
    dispatch(updateUser(updatedUser));
    setEditingUser(null);
  };

  // Filtrimi + Sortimi + Local users gjithmonë në krye
  const finalUsersList = useMemo(() => {
    // 1. Shtojmë user-at lokal në krye
    const localUsers = users.filter((u) => u.isLocal);
    const fetchedUsers = users.filter((u) => !u.isLocal);

    // 2. Filtrimi për search
    const filterFn = (u: User) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    let result = [
      ...localUsers.filter(filterFn),
      ...fetchedUsers.filter(filterFn),
    ];

    // 3. Sortimi nëse zgjidhet
    if (sortOrder === "asc") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [users, search, sortOrder]);

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20">
        <Text color="red.500" fontSize="lg" fontWeight="semibold">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bgGradient={pageBg} py={10}>
      <Container maxW="900px">
        <Heading mb={6} textAlign="center" color="blue.600">
          User Management
        </Heading>

        {/* Add User Toggle */}
        <Button
          colorScheme="green"
          mb={4}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close Form" : "Add User"}
        </Button>

        {showAddForm && (
          <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="lg" mb={6}>
            <UserForm onAdd={handleAddUser} />
          </Box>
        )}

        {/* Controls */}
        <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6}>
          <Input
            placeholder="Search by name or email..."
            bg="white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            bg="white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="none">No Sorting</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </Select>
        </Flex>

        {/* Users */}
        <Stack spacing={4}>
          {finalUsersList.length === 0 ? (
            <Text textAlign="center">No users found.</Text>
          ) : (
            finalUsersList.map((user) => (
              <Box
                key={user.id}
                bg={cardBg}
                p={5}
                borderRadius="xl"
                boxShadow="md"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                }}
              >
                <Flex
                  justify="space-between"
                  align={{ base: "start", md: "center" }}
                  direction={{ base: "column", md: "row" }}
                  gap={3}
                >
                  <Box as={Link} to={`/users/${user.id}`} flex="1">
                    <Heading size="md">{user.name}</Heading>
                    <Text color="gray.600">{user.email}</Text>
                    <Badge mt={2} colorScheme="blue">
                      {user.company.name}
                    </Badge>
                  </Box>

                  <Flex gap={2}>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))
          )}
        </Stack>

        {/* Edit Modal */}
        {editingUser && (
          <UserEditForm
            user={editingUser}
            onUpdate={handleUpdateUser}
            onCancel={() => setEditingUser(null)}
          />
        )}
      </Container>
    </Box>
  );
};

export default UsersPage;
