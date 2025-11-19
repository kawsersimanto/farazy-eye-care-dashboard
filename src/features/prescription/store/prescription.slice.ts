import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Medicine {
  name: string;
  timing: string;
  mealTiming: string;
  duration: string;
  instruction: string;
}

interface SelectedPatient {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
}

interface PrescriptionFormData {
  name: string;
  age: number;
  gender: string;
  phone: string;
  prescribeDate: Date;
  antSegment: string;
  cc: string;
  oe: string;
  postSegment: string;
  var: string;
  medicine: Medicine[];
}

interface PrescriptionState {
  patient: SelectedPatient | null;
  formData: PrescriptionFormData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PrescriptionState = {
  patient: null,
  formData: null,
  isLoading: false,
  error: null,
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    // Patient actions
    setSelectedPatient: (state, action: PayloadAction<SelectedPatient>) => {
      state.patient = action.payload;
    },
    clearSelectedPatient: (state) => {
      state.patient = null;
    },

    // Form data actions
    setFormData: (state, action: PayloadAction<PrescriptionFormData>) => {
      state.formData = action.payload;
    },
    updateFormField: <K extends keyof PrescriptionFormData>(
      state: PrescriptionState,
      action: PayloadAction<{
        field: K;
        value: PrescriptionFormData[K];
      }>
    ) => {
      if (state.formData) {
        state.formData[action.payload.field] = action.payload.value;
      }
    },
    updateMedicine: (
      state,
      action: PayloadAction<{
        index: number;
        medicine: Medicine;
      }>
    ) => {
      if (state.formData) {
        state.formData.medicine[action.payload.index] = action.payload.medicine;
      }
    },
    addMedicine: (state, action: PayloadAction<Medicine>) => {
      if (state.formData) {
        state.formData.medicine.push(action.payload);
      }
    },
    removeMedicine: (state, action: PayloadAction<number>) => {
      if (state.formData && state.formData.medicine.length > 1) {
        state.formData.medicine.splice(action.payload, 1);
      }
    },
    clearFormData: (state) => {
      state.formData = null;
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Reset entire prescription state
    resetPrescription: (state) => {
      state.patient = null;
      state.formData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setSelectedPatient,
  clearSelectedPatient,
  setFormData,
  updateFormField,
  updateMedicine,
  addMedicine,
  removeMedicine,
  clearFormData,
  setLoading,
  setError,
  resetPrescription,
} = prescriptionSlice.actions;

export const prescriptionReducer = prescriptionSlice.reducer;

// Selectors
export const selectPatient = (state: { prescription: PrescriptionState }) =>
  state.prescription.patient;

export const selectFormData = (state: { prescription: PrescriptionState }) =>
  state.prescription.formData;

export const selectMedicines = (state: { prescription: PrescriptionState }) =>
  state.prescription.formData?.medicine || [];

export const selectIsLoading = (state: { prescription: PrescriptionState }) =>
  state.prescription.isLoading;

export const selectError = (state: { prescription: PrescriptionState }) =>
  state.prescription.error;
