import Image from "next/image";
import { useAuthStore } from "@/store/use-auth-store";

export const user = {
  label: useAuthStore.getState().user?.name || "Usuário",
  href: "#",
  icon: (
    <Image
      src="/assets/avatar.png"
      className="h-7 w-7 shrink-0 rounded-full"
      width={50}
      height={50}
      alt="Avatar"
    />
  ),
};

//solução temporária
