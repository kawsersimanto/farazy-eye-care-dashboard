import { IMedicine } from "@/features/medicine/medicine.interface";
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
  selectedMedicine: IMedicine | null;
}

const initialState: PrescriptionState = {
  patient: null,
  selectedMedicine: null,
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    setSelectedPatient: (state, action: PayloadAction<SelectedPatient>) => {
      state.patient = action.payload;
    },
    setSelectedMedicine: (state, action: PayloadAction<IMedicine | null>) => {
      state.selectedMedicine = action.payload;
    },
    clearSelectedPatient: (state) => {
      state.patient = null;
    },
  },
});

export const { setSelectedPatient, setSelectedMedicine, clearSelectedPatient } =
  prescriptionSlice.actions;

export const prescriptionReducer = prescriptionSlice.reducer;
