import { Document, Page, Text, View } from "@react-pdf/renderer";
import { PrescriptionPdfStyle } from "./PrescriptionPdfStyle";

export const PrescriptionPdf = () => (
  <Document>
    <Page size="A4" style={PrescriptionPdfStyle.body}>
      <View style={PrescriptionPdfStyle.section}>
        <Text>Section #1</Text>
      </View>
      <View style={PrescriptionPdfStyle.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
