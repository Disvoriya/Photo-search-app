import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "supersecret"; // Храни в .env

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "Пользователь не найден" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return new Response(JSON.stringify({ error: "Неверный пароль" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const token = sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        return new Response(JSON.stringify({ message: "Успешный вход", token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Ошибка сервера:", error);
        return new Response(JSON.stringify({ error: "Ошибка сервера" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
