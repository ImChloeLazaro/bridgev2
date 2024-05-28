import "./globals.css";
import { Providers } from "./providers";
import { helveticaNowDisplay } from "./assets/fonts/fontTypeWeight";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Aretex Bridge",
  description: "Developed by Aretex IT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="aretex">
      <head />
      {/*// theme */}
      <body
        className={helveticaNowDisplay.className}
        suppressHydrationWarning={true}
      >
        {/*// font */}
        <Providers>
          <main>{children}</main>
          <Toaster
            visibleToasts={4}
            richColors
            expand={true}
            pauseWhenPageIsHidden={true}
          />
        </Providers>
      </body>
    </html>
  );
}
