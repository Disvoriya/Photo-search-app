import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "supersecret";

export async function DELETE(req) {
    try {
        const cookieHeader = req.headers.get("cookie");

        if (!cookieHeader) {
            return NextResponse.json({ message: "Неавторизованный доступ." }, { status: 401 });
        }

        const token = cookieHeader
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ message: "Неавторизованный доступ." }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return NextResponse.json({ message: "Недействительный токен." }, { status: 403 });
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if (!user) {
            return NextResponse.json({ message: "Пользователь не найден." }, { status: 404 });
        }

        // Удаляем пользователя
        await prisma.user.delete({ where: { id: user.id } });

        // Удаляем токен из cookie
        const response = NextResponse.json({ message: "Аккаунт удален." }, { status: 200 });
        response.headers.set("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");

        return response;
    } catch (error) {
        console.error("Ошибка сервера:", error);
        return NextResponse.json({ message: "Ошибка сервера." }, { status: 500 });
    }
}
