export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/extra", "/payments", "/dashboard"],
};
