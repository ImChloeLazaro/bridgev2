import { Amplify } from 'aws-amplify';
// import config from '../src/amplifyconfiguration.json';
import "./globals.css";
import { Providers } from "./providers";
import { helveticaNowDisplay } from "./assets/fonts/fontTypeWeight";

// Amplify.configure(config);

export const metadata = {
  title: "Aretex Bridge",
  description: "Developed by Aretex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="aretex">
      {/*// theme */}
      <body className={helveticaNowDisplay.className}>
        {/*// font */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}