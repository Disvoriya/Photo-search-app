import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email уже зарегистрирован" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return new Response(JSON.stringify({ user }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        return new Response(JSON.stringify({ error: "Ошибка при регистрации", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
