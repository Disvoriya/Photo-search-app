import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "supersecret";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "Пользователь не найден" }, { status: 400 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({ error: "Неверный пароль" }, { status: 400 });
        }

        const token = sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        // Устанавливаем токен в HTTP-only cookie
        const response = NextResponse.json({ message: "Успешный вход" }, { status: 200 });
        response.headers.set(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`
        );

        return response;
    } catch (error) {
        console.error("Ошибка сервера:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
