import { z } from "zod";

export const playlistsSchema = z.object({
  max: z.number().min(5).max(20),
  offset: z.number().min(1).optional(),
});
