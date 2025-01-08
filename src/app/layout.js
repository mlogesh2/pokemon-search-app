import "./globals.css";
import "animate.css/animate.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Pokémon Search App</title>
      </head>
      <body className="container mx-auto p-4 bg-[#ececec]">{children}</body>
    </html>
  );
}
