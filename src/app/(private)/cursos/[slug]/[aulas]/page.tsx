import { getAula } from '@/services/curso/get-cursos';
import React from 'react'

type PageProps = {
    params: {
        slug: string,
        aulas: string
    }
}

export default async function Page({ params }: PageProps) {

    const { slug, aulas } = await params;

    const aula = await getAula(slug, aulas)
    console.log(aula);
    

    return (
        <div className='flex flex-col gap-3'>
            <h1>Nome: {aula?.nome}</h1>
            <p>Descrição: {aula?.descricao}</p>
            <p>Tempo: {aula?.tempo}</p>
        </div>
    )
}
