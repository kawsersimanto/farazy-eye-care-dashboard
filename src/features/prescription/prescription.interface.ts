export interface IPrescriptionMedicine {
  name: string;
  timing: string;
  mealTiming: string;
  duration: string;
  instruction: string;
}

export interface IPrescription {
  name: string;
  phone: string;
  gender: string;
  age: number;
  prescribeDate: string;
  cc: string;
  oe: string;
  var: string;
  antSegment: string;
  postSegment: string;
  medicine: IPrescriptionMedicine[];
}
