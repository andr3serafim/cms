import { getProdutos } from '@/services/origamid/get-produtos';
import React, { useState } from 'react'

export type ProdutosType = {
    id: number,
    nome: string,
    preco: number,
}

export default function Page() {

    const [produtos, setProdutos] = useState<ProdutosType[]>([]);

    async function listProdutos() {
        const lista: ProdutosType[] = await getProdutos();
        setProdutos(lista)
    }

    return (
        <div>
            {produtos.map(produto => (
                <div>
                    <p>nome: {produto.nome}</p>
                    <p>Preço: {produto.preco}</p>
                </div>
            ))}
        </div>
    )
}
