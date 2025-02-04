"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function ChangePasswordForm() {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Пароли не совпадают.");
            return;
        }

        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/user/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ВАЖНО: отправляем HTTP-only cookie
                body: JSON.stringify({ password: form.password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Ошибка при изменении пароля.");
            }

            setSuccess("Пароль успешно изменен.");
            setForm({ password: "", confirmPassword: "" });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Неизвестная ошибка.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить аккаунт? Это действие необратимо.");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch("/api/user/delete-account", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Ошибка при удалении аккаунта.");
            }
    
            alert("Аккаунт успешно удален.");
            router.push("/");
        } catch (err) {
            alert(err instanceof Error ? err.message : "Неизвестная ошибка.");
        }
    };

    return (
        <div className="flex items-center justify-between min-h-scree">
            <div className="p-8 w-1/2 max-w-md">
                <h2 className="text-2xl font-bold mb-4">Смена пароля</h2>
                <hr className="border-t border-gray-300 mb-4" />
                <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Пароль"
                            value={form.password}
                            onChange={handleChange}
                            className="input-field border-none"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="input-field border-none"
                        />
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                    {success && <p className="text-sm text-[#CDA274]">{success}</p>}
                    <button
                        type="submit"
                        className="px-4 py-3 text-white bg-[#CDA274] rounded-lg shadow-md hover:bg-[#b07c58] transition flex items-center justify-center gap-2"
                    >
                        Сменить →
                    </button>
                </form>
                <h2 className="text-2xl font-bold text-[#929C9A] mb-4"  onClick={handleDeleteAccount}>Удалить аккаунт</h2>
                <h2 className="text-2xl font-bold text-[#929C9A] mb-4 hover:cursor-default" onClick={handleLogout}>Выйти</h2>
            </div>
            <div className="w-1/2 items-end flex">
                <img src="https://www.mk.ru/upload/entities/2023/11/09/19/articles/detailPicture/cd/c0/5c/74/f42cb72e5276ae661dcf801f57d28f56.jpg" alt="register" className="rounded-[24px]" />
            </div>
        </div>
    );
}

export default ChangePasswordForm;
