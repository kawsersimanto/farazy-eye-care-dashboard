/* eslint-disable jsx-a11y/alt-text */
import { PrescriptionSchemaType } from "@/features/prescription/prescription.schema";
import { ISchedule } from "@/features/schedule/schedule.interface";
import { IUser } from "@/features/user/user.interface";
import { formatScheduleWithTime } from "@/utils/date";
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { PrescriptionPdfStyle } from "./PrescriptionPdfStyle";

Font.register({
  family: "Space Grotesk",
  fonts: [
    {
      src: "/fonts/space-grotesk/spacegrotesk-regular.ttf",
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      src: "/fonts/space-grotesk/spacegrotesk-medium.ttf",
      fontWeight: 500,
      fontStyle: "normal",
    },
    {
      src: "/fonts/space-grotesk/spacegrotesk-semibold.ttf",
      fontWeight: 600,
      fontStyle: "normal",
    },
    {
      src: "/fonts/space-grotesk/spacegrotesk-bold.ttf",
      fontWeight: 700,
      fontStyle: "normal",
    },
  ],
});

Font.register({
  family: "Work Sans",
  fonts: [
    {
      src: "/fonts/work-sans/worksans-regular.ttf",
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      src: "/fonts/work-sans/worksans-medium.ttf",
      fontWeight: 500,
      fontStyle: "normal",
    },
    {
      src: "/fonts/work-sans/worksans-semibold.ttf",
      fontWeight: 600,
      fontStyle: "normal",
    },
    {
      src: "/fonts/work-sans/worksans-bold.ttf",
      fontWeight: 700,
      fontStyle: "normal",
    },
  ],
});

Font.register({
  family: "Noto Sans Bengali",
  fonts: [
    {
      src: "/fonts/noto-sans-bengali/noto-sans-bengali-regular.ttf",
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      src: "/fonts/noto-sans-bengali/noto-sans-bengali-medium.ttf",
      fontWeight: 500,
      fontStyle: "normal",
    },
    {
      src: "/fonts/noto-sans-bengali/noto-sans-bengali-semibold.ttf",
      fontWeight: 600,
      fontStyle: "normal",
    },
    {
      src: "/fonts/noto-sans-bengali/noto-sans-bengali-bold.ttf",
      fontWeight: 700,
      fontStyle: "normal",
    },
  ],
});

export const PrescriptionPdf = ({
  profile,
  prescription,
  schedules,
}: {
  profile: IUser;
  prescription: PrescriptionSchemaType;
  schedules: ISchedule[];
}) => (
  <Document>
    <Page size="A4" style={PrescriptionPdfStyle.body}>
      {/* header  */}
      <View style={PrescriptionPdfStyle.headerContainer}>
        <Image src="/logo.png" style={PrescriptionPdfStyle.logo} />

        <View style={PrescriptionPdfStyle.contactContainer}>
          <View style={PrescriptionPdfStyle.contactRow}>
            <Image src="/map-pin.png" style={PrescriptionPdfStyle.icon} />
            <View style={PrescriptionPdfStyle.contactText}>
              <Text>{profile?.branch?.addressLine1}</Text>
              <Text>{profile?.branch?.addressLine2}</Text>
            </View>
          </View>

          <View style={PrescriptionPdfStyle.contactRow}>
            <Image src="/mail.png" style={PrescriptionPdfStyle.icon} />
            <Text style={PrescriptionPdfStyle.contactText}>
              {profile?.branch?.email}
            </Text>
          </View>

          <View style={PrescriptionPdfStyle.contactRow}>
            <Image src="/phone.png" style={PrescriptionPdfStyle.icon} />
            <Text style={PrescriptionPdfStyle.contactText}>
              {profile?.branch?.phone}
            </Text>
          </View>
        </View>
      </View>

      {/* doctor Information */}
      <View style={PrescriptionPdfStyle.section}>
        <View style={PrescriptionPdfStyle.doctorContainer}>
          {/* LEFT SECTION */}
          <View style={PrescriptionPdfStyle.left}>
            <Text style={PrescriptionPdfStyle.doctorName}>{profile?.name}</Text>
            <Text style={PrescriptionPdfStyle.doctorPosition}>
              {profile?.doctorProfile?.title}
            </Text>
            <Text style={PrescriptionPdfStyle.doctorSpecialty}>
              {profile?.doctorProfile?.qualifications?.join(", ")}
            </Text>
            <Text style={PrescriptionPdfStyle.doctorDegree}>
              {profile?.doctorProfile?.degrees?.join(", ")}
            </Text>
            <Text style={PrescriptionPdfStyle.doctorDegree}>
              {profile?.branch?.name} Branch
            </Text>
          </View>

          {/* RIGHT SECTION */}
          <View style={PrescriptionPdfStyle.right}>
            <View style={PrescriptionPdfStyle.consultCard}>
              <View style={PrescriptionPdfStyle.consultHeader}>
                <Text style={PrescriptionPdfStyle.consultHeaderText}>
                  Consultant Time
                </Text>
              </View>

              <View style={PrescriptionPdfStyle.consultBody}>
                <Text style={PrescriptionPdfStyle.consultBodyText}>
                  {formatScheduleWithTime(schedules)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Patient Information */}
      <View style={PrescriptionPdfStyle.userSection}>
        <View style={PrescriptionPdfStyle.userContainer}>
          <Text>
            <Text style={PrescriptionPdfStyle.label}>Name: </Text>
            <Text style={PrescriptionPdfStyle.value}>{prescription?.name}</Text>
          </Text>

          <Text>
            <Text style={PrescriptionPdfStyle.label}>Gender: </Text>
            <Text style={PrescriptionPdfStyle.value}>
              {prescription?.gender}
            </Text>
          </Text>

          <Text>
            <Text style={PrescriptionPdfStyle.label}>Age: </Text>
            <Text style={PrescriptionPdfStyle.value}>{prescription?.age}</Text>
          </Text>

          <Text style={PrescriptionPdfStyle.dateText}>
            <Text style={PrescriptionPdfStyle.label}>Date: </Text>
            {format(prescription?.prescribeDate, "PPP")}
          </Text>
        </View>
      </View>

      {/* Prescription Section */}
      <View style={PrescriptionPdfStyle.prescriptionSection}>
        <View style={PrescriptionPdfStyle.prescriptionContainer}>
          {/* History Column */}
          <View style={PrescriptionPdfStyle.historyColumn}>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                C/C:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                {prescription?.cc || "-"}
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                O/E:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                {prescription?.oe || "-"}
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                VaR:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                {prescription?.var || "-"}
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                Ant. Segment:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                {prescription?.antSegment || "-"}
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                Post. Segment:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                {prescription?.postSegment || "-"}
              </Text>
            </View>
          </View>
          {/* Medicine Column */}
          <View style={PrescriptionPdfStyle.medicineColumn}>
            <Text style={PrescriptionPdfStyle.rxTitle}>Rx</Text>
            <View>
              {prescription?.medicine?.map((medicine, id) => (
                <View
                  key={id}
                  style={PrescriptionPdfStyle.prescriptionMedicineRow}
                >
                  <Text style={PrescriptionPdfStyle.medicineItemTitle}>
                    {medicine?.name}
                  </Text>
                  <View style={PrescriptionPdfStyle.medicineInstruction}>
                    <Text style={PrescriptionPdfStyle.value}>
                      {medicine?.timing}
                    </Text>
                    <Text style={PrescriptionPdfStyle.valueBangla}>
                      {medicine?.mealTiming}
                    </Text>
                    <Text style={PrescriptionPdfStyle.value}>
                      {medicine?.duration}
                    </Text>
                    <Text style={PrescriptionPdfStyle.value}>
                      {medicine?.instruction}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <View style={PrescriptionPdfStyle.eyeExamination}>
                {/* Column */}
                <View style={PrescriptionPdfStyle.eyeColumn}>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellHeading}>Eye</Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>RE</Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCellLast}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>LE</Text>
                  </View>
                </View>

                {/* Column 2 */}
                <View style={PrescriptionPdfStyle.eyeColumn}>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellHeading}>Sph</Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.rightEye?.sph || "-"}
                    </Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCellLast}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.leftEye?.sph || "-"}
                    </Text>
                  </View>
                </View>

                {/* Column 3 */}
                <View style={PrescriptionPdfStyle.eyeColumn}>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellHeading}>Cyl</Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.rightEye?.cyl || "-"}
                    </Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCellLast}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.leftEye?.cyl || "-"}
                    </Text>
                  </View>
                </View>

                {/* Column 4 */}
                <View style={PrescriptionPdfStyle.eyeColumn}>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellHeading}>
                      Axis
                    </Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.rightEye?.axis || "-"}
                    </Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCellLast}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.leftEye?.axis || "-"}
                    </Text>
                  </View>
                </View>

                {/* Column 5 */}
                <View style={PrescriptionPdfStyle.eyeLastColumn}>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellHeading}>
                      BC VA
                    </Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCell}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.rightEye?.bcva || "-"}
                    </Text>
                  </View>
                  <View style={PrescriptionPdfStyle.eyeCellLast}>
                    <Text style={PrescriptionPdfStyle.eyeCellData}>
                      {prescription?.leftEye?.bcva || "-"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={PrescriptionPdfStyle.eyeExaminationExtraRow}>
                <View style={PrescriptionPdfStyle.addRow}>
                  <Text style={PrescriptionPdfStyle.label}>Add:</Text>
                  <Text style={PrescriptionPdfStyle.value}>
                    {prescription?.add || "-"}
                  </Text>
                </View>
                <View style={PrescriptionPdfStyle.addRow}>
                  <Text style={PrescriptionPdfStyle.label}>I.P.D:</Text>
                  <Text style={PrescriptionPdfStyle.value}>
                    {prescription?.add || "-"}
                  </Text>
                </View>
                <View style={PrescriptionPdfStyle.addRow}>
                  <Text style={PrescriptionPdfStyle.label}>MM:</Text>
                  <Text style={PrescriptionPdfStyle.value}>
                    {prescription?.add || "-"}
                  </Text>
                </View>
              </View>
              <View style={PrescriptionPdfStyle.eyeExaminationExtraRow}>
                <Text style={PrescriptionPdfStyle.label}>Advice:</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
