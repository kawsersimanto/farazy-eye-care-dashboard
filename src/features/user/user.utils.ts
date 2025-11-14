import { doctorSchemaType } from "./schema/doctor.schema";

export const createDoctorPayload = (values: doctorSchemaType) => {
  const user = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    profileImageUrl: values.profileImageUrl,
  };

  const doctorProfile = {
    about: values.about,
    registrationNo: values.registrationNo,
    yearsExperience: values.yearsExperience,
    consultationFee: values.consultationFee,
    degrees: values.degrees,
    qualifications: values.qualifications,
  };

  return { user, doctorProfile };
};
