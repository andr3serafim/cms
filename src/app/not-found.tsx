import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans antialiased">
            <h1 className="text-4xl font-bold">404 - Página não encontrada</h1>
            <p className="mt-4 mb-4 text-gray-300">Desculpe, essa página não existe.</p>
            <Link href="/">
                <span>Voltar para HOME ⬅️</span>
            </Link>
        </div>
    )
}
