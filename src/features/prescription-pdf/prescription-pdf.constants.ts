import { IPrescription } from "../prescription/prescription.interface";

export const prescription: IPrescription = {
  name: "MD. Joynal Ahmed",
  phone: "+8801534937222",
  gender: "FEMALE",
  age: 23,
  prescribeDate: "2025-11-20T00:50:39.264Z",
  cc: "",
  oe: "",
  var: "",
  antSegment: "",
  postSegment: "",
  medicine: [
    {
      name: "Amoxicillin",
      timing: "1 + 1 + 1",
      mealTiming: "খাবার পর",
      duration: "10",
      instruction: "Take after 1 day",
    },
    {
      name: "Renova",
      timing: "1 + 0 + 1",
      mealTiming: "খাবার আগে",
      duration: "7",
      instruction: "Take proper rest",
    },
  ],
};
