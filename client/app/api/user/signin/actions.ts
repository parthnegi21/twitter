"use server";

import jwt from 'jsonwebtoken';
import client from '@/prisma/db';

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function signin(identifier: string, password: string) {
  try {
    const user = await client.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      return { msg: "Invalid username/email or password." };
    }

    if (user.password !== password) {
      return { msg: "Invalid username/email or password." };
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, username: user.username },
      JWT_SECRET
    );

    return { msg: "Signed in successfully", token };
  } catch (error) {
    console.error("Signin error:", error);
    return { msg: "Signin failed", error: error instanceof Error ? error.message : "Unknown error" };
  }
}
