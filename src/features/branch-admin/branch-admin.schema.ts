import { z } from "zod";

export const BranchAdminSchema = z.object({});

export type BranchAdminSchemaType = z.infer<typeof BranchAdminSchema>;
