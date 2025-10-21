import { AuthState } from "@/features/auth/auth.interface";
import { IUser } from "@/features/user/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: AuthState = {
  email: "",
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    reset: () => initialState,
  },
});

export const { setEmail, setToken, setUser, updateUser, reset } =
  authSlice.actions;

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
