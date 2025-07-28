import { AulasType, CursoType } from "@/app/(private)/cursos/page";
import { axiosApiTeste } from "@/lib/axios-teste";

export async function getCursos() {
    try {
        const res = await axiosApiTeste.get<CursoType[]>('/cursos')
        if (res) {
            return res.data;
        }
        return;
    } catch (err) {
        console.log(err);
    }
}

export async function getCurso(slug: string) {
    try {
        const res = await axiosApiTeste.get<CursoType>(`/cursos/${slug}`)
        if (res) {
            return res.data;
        }
        return;
    } catch (err) {
        console.log(err);
    }
}

export async function getAula(curso: string, aula: string) {
    try {
        const res = await axiosApiTeste.get<AulasType>(`cursos/${curso}/${aula}`)
        if (res) {
            return res.data;
        }
        return;
    } catch (err) {
        console.log(err);
    }
}