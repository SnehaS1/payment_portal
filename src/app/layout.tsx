import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./api/context/AuthProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import { headers } from "next/headers";

import Typography from "@mui/material/Typography";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Payment Portal",
  description: "Payment portal Assesmnent",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = headers();

  const pathname = heads.get("next-url");

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <main
                className="flex w-full justify-center items-start min-h-screen bg-white h-full flex-col pt-5"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage:
                    "linear-gradient(to right bottom, #f90c71, #cf0e66, #a71059, #80104a, #5c0e39)",
                }}
              >
                {pathname === "/login" ||
                pathname === "/register" ||
                pathname === "" ? (
                  <>
                    <Typography
                      variant="h2"
                      marginTop={"5rem"}
                      sx={{ mb: "2rem" }}
                      color={"#eef2f3"}
                      textAlign="center"
                    >
                      Welcome to Epenred Payment Portal
                    </Typography>
                    <section
                      style={{
                        width: "60%",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" color={"#eef2f3"}>
                        The every day platform for all your payment needs
                      </Typography>
                      <Typography variant="h6" color={"#eef2f3"}>
                        Commited Together{" "}
                      </Typography>
                    </section>
                  </>
                ) : null}
                {pathname}

                {children}
              </main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
