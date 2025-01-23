import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryProvider } from "./react-query-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  );
}
