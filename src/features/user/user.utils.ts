import { doctorSchemaType } from "./schema/doctor.schema";
import { employeeSchemaType } from "./schema/exployee.schema";

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

export const createEmployeePayload = (values: employeeSchemaType) => {
  const user = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    profileImageUrl: values.profileImageUrl,
  };

  const employeeProfile = {
    department: values.department,
    position: values.position,
    salary: values.salary,
  };

  return { user, employeeProfile };
};
