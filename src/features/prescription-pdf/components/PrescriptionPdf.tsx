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

      <View style={PrescriptionPdfStyle.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
