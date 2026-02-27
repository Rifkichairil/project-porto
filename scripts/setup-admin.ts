import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

function createClientAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key || url.includes("your_") || key.includes("your_")) {
    return null;
  }
  
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function setupAdmin() {
  const supabase = createClientAdmin();

  if (!supabase) {
    console.error("Supabase not configured. Please check your environment variables.");
    process.exit(1);
  }

  const email = process.argv[2] || "admin@example.com";
  const password = process.argv[3] || "admin123";
  const name = process.argv[4] || "Administrator";

  console.log(`Setting up admin user: ${email}`);

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (existingUser) {
    console.log("Admin user already exists. Updating password...");
    
    const { error } = await supabase
      .from("users")
      .update({
        password_hash: hashPassword(password),
        name,
        is_active: true,
      })
      .eq("email", email);

    if (error) {
      console.error("Error updating admin:", error);
      process.exit(1);
    }

    console.log("Admin user updated successfully!");
  } else {
    const { error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password_hash: hashPassword(password),
          name,
          role: "admin",
          is_active: true,
        },
      ]);

    if (error) {
      console.error("Error creating admin:", error);
      process.exit(1);
    }

    console.log("Admin user created successfully!");
  }

  console.log(`\nLogin credentials:`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`\nIMPORTANT: Please change the default password after first login!`);
}

setupAdmin();
