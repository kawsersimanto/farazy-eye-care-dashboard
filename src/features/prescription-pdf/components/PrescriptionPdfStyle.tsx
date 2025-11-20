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
    padding: 20,
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
    padding: 20,
    borderBottom: "1px solid #e4e4e7",
  },

  doctorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  // user section
  userSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottom: "1px solid #e4e4e7",
  },

  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  leftBlock: {
    flexDirection: "column",
    gap: 4,
  },
  rightBlock: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  userItem: {
    fontSize: 9,
    color: "#000",
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
  },
  value: {
    fontSize: 9,
    fontWeight: 400,
  },
  dateText: {
    fontSize: 9,
  },

  // prescription area
  prescriptionSection: {
    paddingHorizontal: 20,
  },

  prescriptionContainer: {
    flexDirection: "row",
  },

  historyColumn: {
    width: "30%",
    fontWeight: "bold",
    marginRight: 40,
    paddingVertical: 20,
    paddingRight: 40,
  },
  prescriptNoteItem: {
    marginBottom: 24,
  },
  prescriptNoteItemTitle: {
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 500,
  },
  medicineColumn: {
    flex: 1,
    paddingVertical: 20,
  },
  rxTitle: {
    marginBottom: 10,
  },
  medicineItemTitle: {
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 600,
  },
  medicineInstruction: {
    flexDirection: "row",
    gap: 10,
  },
  valueBangla: {
    fontFamily: "Noto Sans Bengali",
    fontSize: 9,
    fontWeight: 400,
  },
  prescriptionMedicineRow: {
    marginBottom: 10,
  },
});
