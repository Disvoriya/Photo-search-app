"use client"

import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'


export default function NoneMenu() {
    const theme = useTheme()
    const router = useRouter()

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-[#292F36] ml-3">Фото Выставка</h1>
            </div>
        </>
    )
}
