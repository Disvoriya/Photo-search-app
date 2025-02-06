"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

function RegisterForm() {
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ email: "", confirmPassword: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newErrors = { email: "", password: "", confirmPassword: "" };

        if (!form.email.includes("@")) {
            newErrors.email = "Некорректный email";
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Пароли не совпадают!";
        }

        if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
            setErrors(newErrors);
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, password: form.password }),
        });

        if (res.ok) {
            router.push("/login");
        } else {
            setErrors({ ...errors, email: "Ошибка регистрации!" });
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

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={`w-full px-2 py-1 placeholder-[#CDA274] focus:outline-none border ${errors.email ? "border-[#C76904]" : "border-gray-300"
                                }`}
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email ? (
                            <FaExclamationCircle className="absolute right-2 top-2 text-error" />
                        ) : (
                            form.email && <FaCheckCircle className="absolute right-2 top-2 text-[#CDA274]" />
                        )}
                        {errors.email && <p className="text-error text-sm">{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            className={`w-full px-2 py-1 placeholder-[#CDA274] focus:outline-none border ${errors.confirmPassword ? "border-[#C76904]" : "border-gray-300"
                                }`}
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword ? (
                            <FaExclamationCircle className="absolute right-2 top-2 text-error" />
                        ) : (
                            form.confirmPassword && form.password === form.confirmPassword && (
                                <FaCheckCircle className="absolute right-2 top-2 text-[#CDA274]" />
                            )
                        )}
                        {errors.confirmPassword && <p className="text-error text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            className={`w-full px-2 py-1 placeholder-[#CDA274] focus:outline-none border ${errors.confirmPassword ? "border-[#C76904]" : "border-gray-300"
                                }`}
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword ? (
                            <FaExclamationCircle className="absolute right-2 top-2 text-error" />
                        ) : (
                            form.confirmPassword && form.password === form.confirmPassword && (
                                <FaCheckCircle className="absolute right-2 top-2 text-[#CDA274]" />
                            )
                        )}
                        {errors.confirmPassword && <p className="text-error text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <Link href="/login" className="block mt-2 text-sm text-white hover:none">
                        Уже есть учетная запись?
                    </Link>

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
