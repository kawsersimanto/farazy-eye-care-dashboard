import { StyleSheet } from "@react-pdf/renderer";

export const PrescriptionPdfStyle = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    fontFamily: "Space Grotesk",
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
    marginTop: 12,
  },
});
