import { authMiddleware } from "@clerk/nextjs";
 
  // Protects all routes, including api/trpc.
//Please edit thsi to allow other routes to be public as needed
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};