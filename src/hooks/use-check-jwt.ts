// hooks/useCheckJwt.tsx
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function useCheckJwt() {
  const { data: session, status } = useSession()

  useEffect(() => {
    // Só executa se o usuário logou via Google (social) e NÃO tem o cookie JWT
    if (status === "authenticated" && typeof window !== "undefined") {
      if (!document.cookie.includes("token=")) {
        // Redireciona para gerar o JWT httpOnly
        window.location.href = "/api/auth/social"
      }
    }
  }, [status, session])
}
