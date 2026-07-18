import { colors } from "./colors";
import { typography } from "./typography";

export const theme = {
  colors,
  typography,
} as const;

export * from "./colors";
export * from "./typography";
