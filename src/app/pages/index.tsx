
import { Box, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
// модули Node.js
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// компонент статической страницы
export default function Home({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Typography variant='h4' textAlign='center' py={2}>
        Welcome to our website
      </Typography>
    </>
  )
}

// функция генерации статического контента с данными
export async function getStaticProps(ctx: GetStaticPropsContext) {
  let data = {}

  // путь к данным
  const dataPath = join(process.cwd(), 'public/data/home.json')

  try {
    // читаем файл
    const dataJson = await readFile(dataPath, 'utf-8')
    if (dataJson) {
      // преобразуем данные из строки JSON в объект JS
      data = JSON.parse(dataJson)
    }
  } catch (e) {
    console.error(e)
  }

  // передаем данные компоненту страницы в виде пропа
  return {
    props: {
      data
    }
  }
}
