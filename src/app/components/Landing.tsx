"use client";

import { useRouter } from "next/navigation";


export default function Landing() {
    const router = useRouter()


    return (
        <div className="relative bg-gray-300 rounded-tl-[50px] sm:rounded-tl-[100px] rounded-br-[50px] sm:rounded-br-[100px] overflow-hidden">
            <img
                src="https://i.pinimg.com/736x/0a/6d/64/0a6d647f04e9b26dceb3bb585dac5647.jpg"
                alt="Фото выставка"
                className="w-full h-auto object-cover max-h-[500px] sm:max-h-[758px]"
            />
            <div className="absolute inset-0 bg-[#292F36] bg-opacity-30 flex flex-col justify-start items-start text-start text-white p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl font-bold mt-10 sm:mt-20">
                    Добро пожаловать в мир <br className="hidden sm:block" /> неограниченного творчества!
                </h2>
                <p className="mt-2 text-base sm:text-lg w-full sm:w-96">
                    Присоединяйтесь к тысячам креативных людей, которые уже нашли всё необходимое для своих проектов.
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-white p-1 rounded-lg shadow">
                    <button className="bg-[#CDA274] text-white px-6 py-2 rounded-lg w-full sm:w-auto" onClick={() => router.push('/register')}>Регистрация</button>
                    <button  onClick={() => router.push('/login')} className="border px-6 py-2 text-[#292F36] rounded-lg w-full sm:w-auto">Вход</button>
                </div>
            </div>
        </div>
    );
}
