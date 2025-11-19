import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedPatient {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
}

interface PrescriptionState {
  patient: SelectedPatient | null;
}

const initialState: PrescriptionState = {
  patient: null,
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    setSelectedPatient: (state, action: PayloadAction<SelectedPatient>) => {
      state.patient = action.payload;
    },
    clearSelectedPatient: (state) => {
      state.patient = null;
    },
  },
});

export const { setSelectedPatient, clearSelectedPatient } =
  prescriptionSlice.actions;
export const prescriptionReducer = prescriptionSlice.reducer;
