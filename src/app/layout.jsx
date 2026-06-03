import "./globals.css";

export const metadata = {
  title: "TrillioTek — High-performance, AI-friendly websites",
  description:
    "TrillioTek is a web solutions company building fast, scalable, AI-friendly websites and web apps for businesses in India, Canada and beyond.",
  keywords: [
    "web development",
    "Next.js",
    "AI-friendly websites",
    "web design",
    "TrillioTek",
    "India",
    "Canada",
  ],
  openGraph: {
    title: "TrillioTek — High-performance, AI-friendly websites",
    description:
      "Fast, scalable, AI-friendly websites and web apps. Based in India & Canada.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#F6F3EC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Hanken+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased grain">{children}</body>
    </html>
  );
}
