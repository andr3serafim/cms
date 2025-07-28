import { ProdutosType } from "@/app/(private)/produtos/page";
import { axiosApiTeste } from "@/lib/axios-teste";

export async function getProdutos() {

    const response = await axiosApiTeste.get<ProdutosType[]>('/produtos')
    if(response) {
        return response.data;
    }
    console.log(response);
    return;

}