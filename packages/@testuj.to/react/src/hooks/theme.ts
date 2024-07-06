import { TenantTheme } from "@lib/types";

import { type ThemeCSS } from "../utils/cssifyTheme";
import { useTTContext } from "../context";

export interface Theme extends TenantTheme, ThemeCSS {}
export const useTheme = (): Theme => {
    return useTTContext().theme;
};
