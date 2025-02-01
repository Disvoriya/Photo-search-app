"use client"

import { List, ListItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function NoneMenu() {
    const theme = useTheme()
    const router = useRouter()

    return (
        <>
            <div className="flex items-center">
                <button 
                    className="bg-[#CDA274] text-white px-3 py-2 rounded-lg"
                    onClick={() => router.back()}
                >
                    &#8592;
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-[#292F36] ml-3">Фото Выставка</h1>
            </div>
        </>
    )
}
