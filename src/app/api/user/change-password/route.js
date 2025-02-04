import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "supersecret";

export async function POST(req) {
    try {
        const { password } = await req.json();
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

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: "Пароль успешно изменен." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Ошибка сервера." }, { status: 500 });
    }
}
