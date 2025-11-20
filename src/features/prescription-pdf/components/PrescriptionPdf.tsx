/* eslint-disable jsx-a11y/alt-text */
import { Document, Font, Image, Page, Text, View } from "@react-pdf/renderer";
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

export const PrescriptionPdf = () => (
  <Document>
    <Page size="A4" style={PrescriptionPdfStyle.body}>
      {/* header  */}
      <View style={PrescriptionPdfStyle.headerContainer}>
        <Image src="/logo.png" style={PrescriptionPdfStyle.logo} />

        <View style={PrescriptionPdfStyle.contactContainer}>
          <View style={PrescriptionPdfStyle.contactRow}>
            <Image src="/map-pin.png" style={PrescriptionPdfStyle.icon} />
            <Text style={PrescriptionPdfStyle.contactText}>
              123 Main Street, Sector 7
            </Text>
          </View>

          <View style={PrescriptionPdfStyle.contactRow}>
            <Image src="/mail.png" style={PrescriptionPdfStyle.icon} />
            <Text style={PrescriptionPdfStyle.contactText}>
              info@hospital.com
            </Text>
          </View>

          <View style={PrescriptionPdfStyle.contactRow}>
            <Image src="/phone.png" style={PrescriptionPdfStyle.icon} />
            <Text style={PrescriptionPdfStyle.contactText}>+8801700000000</Text>
          </View>
        </View>
      </View>

      {/* doctor Information */}
      <View style={PrescriptionPdfStyle.section}>
        <View style={PrescriptionPdfStyle.doctorContainer}>
          {/* LEFT SECTION */}
          <View style={PrescriptionPdfStyle.left}>
            <Text style={PrescriptionPdfStyle.doctorName}>Kamal Hasan</Text>
            <Text style={PrescriptionPdfStyle.doctorPosition}>
              Senior Retina Doctor
            </Text>
            <Text style={PrescriptionPdfStyle.doctorDegree}>MBBS, MS, EYE</Text>
            <Text style={PrescriptionPdfStyle.doctorSpecialty}>
              Cataract, Eye
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
                  Monday (09:00 AM - 05:00 PM), Wednesday (10:00 PM - 12:30 AM)
                  & Thursday (07:59 PM - 08:15 PM)
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
            <Text style={PrescriptionPdfStyle.value}>MD. Joynal Ahmed</Text>
          </Text>

          <Text>
            <Text style={PrescriptionPdfStyle.label}>Gender: </Text>
            <Text style={PrescriptionPdfStyle.value}>Female</Text>
          </Text>

          <Text>
            <Text style={PrescriptionPdfStyle.label}>Age: </Text>
            <Text style={PrescriptionPdfStyle.value}>23</Text>
          </Text>

          <Text style={PrescriptionPdfStyle.dateText}>
            <Text style={PrescriptionPdfStyle.label}>Date: </Text>
            November 20th, 2025
          </Text>
        </View>
      </View>

      {/* Prescription Section */}
      <View style={PrescriptionPdfStyle.prescriptionSection}>
        <View style={PrescriptionPdfStyle.prescriptionContainer}>
          <View style={PrescriptionPdfStyle.historyColumn}>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                C/C:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                Mild headache and watering eyes
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                O/E:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                Mild headache and watering eyes
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                VaR:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                Mild headache and watering eyes
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                Ant. Segment:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                Mild headache and watering eyes
              </Text>
            </View>
            <View style={PrescriptionPdfStyle.prescriptNoteItem}>
              <Text style={PrescriptionPdfStyle.prescriptNoteItemTitle}>
                Post. Segment:{" "}
              </Text>
              <Text style={PrescriptionPdfStyle.value}>
                Mild headache and watering eyes
              </Text>
            </View>
          </View>
          <View style={PrescriptionPdfStyle.medicineColumn}>
            <Text>Rx</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
