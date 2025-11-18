import { authReducer } from "@/features/auth/store/auth.slice";
import { userReducer } from "@/features/user/store/user.slice";
import { baseApi } from "@/redux/api/baseApi";
import { prescriptionReducer } from "@/features/prescription/store/prescription.slice";
import { appointmentReducer } from "@/features/appointment/store/appointment.slice";
import { specializationReducer } from "@/features/specialization/store/specialization.slice";
import { scheduleReducer } from "@/features/schedule/store/schedule.slice";
import { branchAdminReducer } from "@/features/branch-admin/store/branch-admin.slice";
import { employeeReducer } from "@/features/employee/store/employee.slice";
import { doctorReducer } from "@/features/doctor/store/doctor.slice";
import { patientReducer } from "@/features/patient/store/patient.slice";
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
  prescription: prescriptionReducer,
  appointment: appointmentReducer,
  specialization: specializationReducer,
  schedule: scheduleReducer,
  branchAdmin: branchAdminReducer,
  employee: employeeReducer,
  doctor: doctorReducer,
  patient: patientReducer,
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
