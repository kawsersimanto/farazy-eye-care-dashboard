import { authReducer } from "@/features/auth/store/auth.slice";
import { userReducer } from "@/features/user/store/user.slice";
import { baseApi } from "@/redux/api/baseApi";
import { medicineReducer } from "@/features/medicine/store/medicine.slice";
import { medicineCategoryReducer } from "@/features/medicine-category/store/medicine-category.slice";
import { medicineBrandReducer } from "@/features/medicine-brand/store/medicine-brand.slice";
import { departmentReducer } from "@/features/department/store/department.slice";
import { branchReducer } from "@/features/branch/store/branch.slice";
import { paymentReducer } from "@/features/payment/store/payment.slice";
import { imageReducer } from "@/features/image/store/image.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: [],
  storage,
};

const rootReducer = combineReducers({
  medicine: medicineReducer,
  medicineCategory: medicineCategoryReducer,
  medicineBrand: medicineBrandReducer,
  department: departmentReducer,
  branch: branchReducer,
  payment: paymentReducer,
  image: imageReducer,
  user: userReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
