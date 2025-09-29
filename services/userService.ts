import prisma from "../lib/prisma";
import { hashPassword } from "../lib/auth";
import { User } from "@/lib/types";

export class UserService {
  static async createUser(userData: User) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: userData.email }, { phone: userData.phone }],
        },
      });

      if (existingUser) {
        if (existingUser.email === userData.email) {
          throw new Error("User with this email already exists");
        }
        if (existingUser.phone === userData.phone) {
          throw new Error("User with this phone number already exists");
        }
      }

      const hashedPassword = await hashPassword(userData.password);
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          phone: userData.phone,
          password: hashedPassword,
          country: userData.country,
          createdAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          phone: true,
          country: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        phone: true,
        country: true,
        createdAt: true,
      },
    });
  }
  static async getUserByPhoneNumber(phone: string) {
    return await prisma.user.findUnique({
      where: { phone },
      select: {
        id: true,
        email: true,
        phone: true,
        country: true,
        createdAt: true,
      },
    });
  }
}
