import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/User";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
   addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
  const newUser: User = {
    ...action.payload,
    id: Date.now(),
    isLocal: true, // FLAG për user-at lokal
  };
  state.users.unshift(newUser);
},

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (u) => u.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(
        (u) => u.id !== action.payload
      );
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
