"use client"; // Only wrap MUI-related parts in a Client Component

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const cache = createCache({ key: "mui", prepend: true });
const theme = createTheme(); // Customize if needed

export default function MUIProvider({ children }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
