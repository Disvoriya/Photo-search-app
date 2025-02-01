"use client";

import { useState } from "react";

function ChangePasswordForm() {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Проверяем совпадение паролей
        if (form.password !== form.confirmPassword) {
            setError("Пароли не совпадают.");
            return;
        }

        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Вы не авторизованы.");
            return;
        }

        try {
            const response = await fetch("/api/user/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify({ password: form.password }),
            });

            if (response.ok) {
                setSuccess("Пароль успешно изменен.");
                setForm({ password: "", confirmPassword: "" });
            } else {
                const data = await response.json();
                setError(data.message || "Ошибка при изменении пароля.");
            }
        } catch (err) {
            setError("Ошибка подключения к серверу.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Смена пароля</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Новый пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Введите новый пароль"
                            value={form.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CDA274] focus:border-[#CDA274]"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Повторите новый пароль
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#CDA274] focus:border-[#CDA274]"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-[#CDA274] rounded-md shadow hover:bg-[#b07c58] focus:outline-none"
                    >
                        Сменить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordForm;
