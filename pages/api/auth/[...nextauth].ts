import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import "firebase/firestore";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
  },
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["state", "nonce", "none", "pkce"],
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            throw new Error("Invalid login details");
          })
          .catch((error) => {
            throw new Error("Invalid login details");
          });
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }:any) {
      // Ensure redirection to a clean URL without query parameters
      return baseUrl;
    },
  },
  csrf: {
    // NextAuth will handle CSRF internally using anti-CSRF tokens
    csrfToken: true,
  },
};

export default NextAuth(authOptions);
