"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const router = useRouter();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, password: form.password }),
        });

        if (res.ok) {
            alert("Регистрация успешна!");
            router.push("/home");
        } else {
            setError("Ошибка регистрации!");
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
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            className="w-full px-2 py-1 placeholder-[#CDA274] focus:outline-none"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Link
                            href="/login"
                            className="block mt-2 text-sm text-white hover:none"
                        >
                            Уже есть учетная запись?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 px-6 py-3 rounded-md flex items-center justify-center space-x-2 text-white bg-[#CDA274]"
                    >
                        <span className="text-white">Регистрация</span>
                    </button>
                </form>
            </div>
            <div className="bg-[#F9F8F7] w-1/3">
                <img src="image/Поиск изооброжений (1)-6.png" alt="register" className="min-h-full min-w-screen" />
            </div>
        </div>
    );
}

export default RegisterForm;