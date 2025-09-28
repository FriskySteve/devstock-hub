import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailOrMobile: { label: "Email or mobile phone number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrMobile || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                emailOrMobile: credentials.emailOrMobile,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            return null;
          }

          const result = await response.json();

          if (!result?.user?.id) {
            return null;
          }

          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name || result.user.phone || result.user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ? String(user.id) : undefined;
        token.email = String(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: String(token.email),
          name: token.name ?? "Unkown",
          image: token.picture ?? undefined,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
