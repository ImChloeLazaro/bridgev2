import "./globals.css";
import { Providers } from "./providers";
import { helveticaNowDisplay } from "./assets/fonts/fontTypeWeight";

export const metadata = {
  title: "Aretex Bridge",
  description: "Developed by Aretex IT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="aretex">
      {/*// theme */}
      <body className={helveticaNowDisplay.className} suppressHydrationWarning={true}>
        {/*// font */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}