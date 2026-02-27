import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClientAdmin } from "./supabase";
import crypto from "crypto";

// Simple hash function for password comparison
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = createClientAdmin();

        // Check if Supabase is configured
        if (!supabase) {
          console.log("Supabase not configured, using fallback auth");
          // Fallback to env-based auth for development
          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (
            credentials.email === adminEmail &&
            credentials.password === adminPassword
          ) {
            return {
              id: "1",
              email: adminEmail,
              name: "Admin",
              role: "admin",
            };
          }
          return null;
        }

        // Fetch user from database
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .eq("is_active", true)
          .single();

        if (error || !user) {
          console.log("User not found or error:", error);
          return null;
        }

        // Verify password
        if (!verifyPassword(credentials.password, user.password_hash)) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/manage",
    error: "/manage",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};

// Helper function to create admin user
export async function createAdminUser(
  email: string,
  password: string,
  name: string = "Admin"
) {
  const supabase = createClientAdmin();
  
  if (!supabase) {
    console.log("Supabase not configured");
    return null;
  }

  const passwordHash = hashPassword(password);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        password_hash: passwordHash,
        name,
        role: "admin",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating admin user:", error);
    return null;
  }

  return data;
}

// Helper function to change password
export async function changePassword(
  userId: string,
  newPassword: string
) {
  const supabase = createClientAdmin();
  
  if (!supabase) {
    console.log("Supabase not configured");
    return false;
  }

  const passwordHash = hashPassword(newPassword);

  const { error } = await supabase
    .from("users")
    .update({ password_hash: passwordHash })
    .eq("id", userId);

  if (error) {
    console.error("Error changing password:", error);
    return false;
  }

  return true;
}
