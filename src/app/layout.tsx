import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import AuthProvider from "./api/context/AuthProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Payment Portal",
  description: "Payment portal Assesmnent",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <Navbar />
//           <main className="flex justify-center items-start p-6 min-h-screen">
//             {children}
//           </main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

// or `v1X-appRouter` if you are using Next.js v1X

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider>
            <Navbar />
            <ThemeProvider theme={theme}>
              <main
                className="flex justify-center items-start p-6 min-h-screen bg-white"
                style={{ border: "2px solid green" }}
              >
                {children}
              </main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
