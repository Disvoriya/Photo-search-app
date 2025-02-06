"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/home");
        } else {
            setError(data.error || "Ошибка авторизации");
        }
    };

    return (
        <div className="flex">
            <div className="pt-6 w-2/3">
                <h1 className="text-3xl font-bold mb-4 mt-4 text-gray-300">Добро пожаловать!</h1>
                <p className="text-gray-300 mb-6 w-80">
                    Доступ к миллионам изображений за пару кликов
                </p>
                <form className="space-y-4 pr-10" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-2 py-1 placeholder-[#CDA274] focus:outline-none"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            className="w-full px-2 py-1 placeholder-[#CDA274] focus:outline-none"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="text-error text-sm">{error}</p>}
                    <Link href="/register" className="block mt-2 text-sm text-white hover:none">
                        Еще нет учетной записи?
                    </Link>
                    <button
                        type="submit"
                        className="mt-6 px-6 py-3 rounded-md flex items-center justify-center space-x-2 text-white bg-[#CDA274]"
                    >
                        <span className="text-white">Войти</span>
                    </button>
                </form>
            </div>
            <div className="bg-[#F9F8F7] w-1/3">
                <img src="image/Поиск изооброжений (1)-6.png" alt="register" className="min-h-full min-w-screen" />
            </div>
        </div>
    );
}

export default LoginForm;
