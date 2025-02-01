import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "supersecret"; // Тот же ключ, что и при создании токена

export async function POST(req) {
    try {
        // Получаем токен из заголовка авторизации
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return Response.json({ message: "Токен отсутствует или недействителен." }, { status: 401 });
        }

        const token = authHeader.split(" ")[1]; // Извлекаем токен после "Bearer"
        let userId;

        try {
            // Декодируем токен и получаем ID пользователя
            const decoded = verify(token, SECRET_KEY);
            userId = decoded.userId;
        } catch (error) {
            return Response.json({ message: "Недействительный токен." }, { status: 401 });
        }

        if (!userId) {
            return Response.json({ message: "Не удалось получить ID пользователя из токена." }, { status: 401 });
        }

        // Получаем данные из запроса
        const { password } = await req.json();

        // Хэшируем новый пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Обновляем пароль пользователя
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return Response.json({ message: "Пароль успешно изменен." });
    } catch (error) {
        console.error("Ошибка:", error);
        return Response.json({ message: "Ошибка сервера." }, { status: 500 });
    }
}
