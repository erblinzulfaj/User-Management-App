import { useEffect, useState } from "react";
import type { User } from "../types/User";

import { fetchUsers } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Something went wrong while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, setUsers, loading, error };
};
