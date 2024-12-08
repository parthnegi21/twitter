
"use server";

import jwt from 'jsonwebtoken';
import client from '@/prisma/db';

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function signup(email: string, name: string, password: string,username:string) {
  try {
  
    const existingUser = await client.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { msg: "Email already exists. Try a different email." };
    }


    const user = await client.user.create({
      data: {
        email,
        name,
        password,
        username
      },
    });

    console.log(user)

    const token = jwt.sign(user, JWT_SECRET);

    return { msg: "Signed up successfully", token };
  } catch (error) {
    console.error("Signup error:", error);
    return { msg: "Signup failed", error: error instanceof Error ? error.message : "Unknown error" };
  }
}
