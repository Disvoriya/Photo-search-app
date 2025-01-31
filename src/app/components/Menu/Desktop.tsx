"use client"

import { List, ListItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { PageLinks } from '../Header'
import Link from 'next/link'

type Props = {
    links: PageLinks
}

export default function DesktopMenu({ links }: Props) {
    const theme = useTheme()

    return (
        <>
            <div className="flex items-center">
                <button className="bg-[#CDA274] text-white px-3 py-2 rounded-lg">&#8592;</button>
                <h1 className="text-xl sm:text-2xl font-bold text-[#292F36] ml-3">Фото Выставка</h1>
            </div>
            <List
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    justifyContent: 'flex-end',
                    paddingInline: theme.spacing(1)
                }}
            >
                {links.map((link, i) => (
                    <ListItem key={i}>
                        <Link href={link.href}>
                            {link.title}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </>

    )
}
