import { StyleSheet } from "@react-pdf/renderer";

export const PrescriptionPdfStyle = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    fontFamily: "Work Sans",
    fontSize: 12,
  },

  // Top Header Wrapper
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    borderBottom: "1px solid #e4e4e7",
  },

  // Logo
  logo: {
    width: 120,
    height: "auto",
  },

  // Right contact block
  contactContainer: {
    flexDirection: "column",
    gap: 4,
    maxWidth: 200,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },

  contactText: {
    fontSize: 10,
    color: "#000",
  },

  icon: {
    width: 10,
    height: 10,
    marginTop: 1,
  },

  section: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    borderBottom: "1px solid #e4e4e7",
  },

  doctorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },

  // Left Column
  left: {
    flexDirection: "column",
    width: "50%",
  },

  doctorName: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "Space Grotesk",
    color: "#1a1a1a",
  },

  doctorPosition: {
    fontSize: 10,
    color: "#333",
  },
  doctorDegree: {
    fontSize: 10,
    color: "#333",
  },
  doctorSpecialty: {
    fontSize: 10,
    color: "#333",
  },

  // Right Column
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "50%",
  },

  consultCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    maxWidth: 200,
  },

  consultHeader: {
    backgroundColor: "#238646",
    paddingVertical: 6,
    paddingHorizontal: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
  },

  consultHeaderText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    textAlign: "center",
  },

  consultBody: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  consultBodyText: {
    fontSize: 10,
    textAlign: "center",
    color: "#000",
  },
});
