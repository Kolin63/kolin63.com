import localFont from "next/font/local";
import "./globals.css";

const cascadiaMono = localFont({
  src: "./fonts/CascadiaMono.woff2",
  variable: "--font-cascadia-mono",
  weight: "100 900",
});

const cascadiaMonoSemiLight = localFont({
  src: "./fonts/CascadiaMono-SemiLight.woff2",
  variable: "--font-cascadia-mono-semi-light",
  weight: "100 900",
});

export const metadata = {
  title: "Kolin63",
  description: "Kolin63's Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cascadiaMono.variable} ${cascadiaMonoSemiLight.variable}`}>
        {children}
      </body>
    </html>
  );
}
