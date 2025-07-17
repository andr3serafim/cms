
import { getCurso } from '@/services/curso/get-cursos';
import Link from 'next/link';
import React from 'react'

type PageProps = {
    params: {
        slug: string;
    }
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    const curso = await getCurso(slug);
    return (
        <div className='flex flex-col gap-3'>
            <h1>{curso?.nome} - Aulas</h1>
            {curso?.aulas.map(aula => (
                <div key={aula.curso_id}>
                    <p>Nome: {aula.nome}</p>
                    <p>Descrição: {aula.descricao}</p>
                    <p>Tempo: {aula.tempo} Hrs</p>
                    <Link href={`/cursos/${curso.slug}/${aula.slug}`}>
                        <button className='px-4 my-1 border-[1px] border-lime-700 bg-lime-500 text-gray-950 font-semibold rounded-sm hover:bg-lime-600 transition-all duration-200'>Detalhes da aula</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}
