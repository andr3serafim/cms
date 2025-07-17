'use client'

import { getCursos } from '@/services/curso/get-cursos';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


export type CursoType = {
    id: number,
    slug: string,
    nome: string,
    descricao: string,
    total_aulas: number,
    total_horas: number,
    aulas: AulasType[],
}

export type AulasType = {
    id: number,
    slug: string,
    nome: string,
    descricao: string,
    curso_id: number,
    tempo: number,
    ordem: number
}

export default function Page() {

    const [cursos, setCursos] = useState<CursoType[]>([])

    useEffect(() => {
        async function fetchCursos() {
            const res = await getCursos();
            if (res) {
                setCursos(res)
            }
            return;
        }
        fetchCursos();
    }, []);

    return (
        <div className='flex flex-col gap-3'>
            <h1>CURSOS 2025</h1>
            <div className='flex flex-col gap-3'>{cursos.map(curso =>
                <div key={curso.id}>
                    <p>Nome do curso: {curso.nome}</p>
                    <p>Descrição do curso: {curso.descricao}</p>
                    <Link href={`/cursos/${curso.slug}`}>
                        <div>Aulas: <button className='px-4 my-1 border-[1px] border-lime-700 bg-lime-500 text-gray-950 font-semibold rounded-sm hover:bg-lime-600 transition-all duration-200'>{curso.slug}</button></div>
                    </Link>
                </div>
            )}</div>
        </div>
    )
}
