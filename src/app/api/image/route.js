import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Параметр запроса является обязательным" }, { status: 400 });
  }

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 12 },
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        "Accept-Version": "v1",
      },
    });

    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error("Ошибка при выборке изображений:", error);
    return NextResponse.json({ error: "Не удалось получить изображения" }, { status: 500 });
  }
}
