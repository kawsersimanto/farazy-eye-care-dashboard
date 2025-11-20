"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { PrescriptionPdf } from "./PrescriptionPdf";

export const PrescriptionPdfRender = () => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <PrescriptionPdf />
  </PDFViewer>
);
