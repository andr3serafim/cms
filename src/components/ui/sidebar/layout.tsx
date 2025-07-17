"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/util/cn";
import { Sidebar, SidebarBody, SidebarLink } from "./components";
import { privateLinks } from "@/components/ui/sidebar/private-links";
import { useAuthStore } from "@/store/use-auth-store";
import Image from "next/image";
import { IconArrowLeft } from "@tabler/icons-react";

interface Links {
  label: string;
  href?: string;
  function?: () => void;
  icon: React.JSX.Element | React.ReactNode;
}

type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [open, setOpen] = useState(false);
  const links: Links[] = privateLinks;
  const bottomLink: Links = {
    label: "Logout",
    function: async () => {
      const logout = useAuthStore.getState().logout;
      await logout();
      // Redirecionar para login, se necessário:
      window.location.href = '/login';
    },
    icon: <IconArrowLeft className="hover:text-red-500 h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <UserAvatarOpened /> : <UserAvatarClosed />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink link={bottomLink} />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </main>
    </div>
  );
};

const UserAvatarOpened = () => {
  const user = useAuthStore.getState().user?.name || "Usuário";
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        width={50}
        height={50}
        src="/assets/avatar.png"
        className="h-7 w-7 shrink-0 rounded-full"
        alt="Avatar"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre text-black dark:text-white"
      >
        {user}
      </motion.span>
    </a>
  );
};

// const LogoIcon = () => {
//   return (
//     <a
//       href="#"
//       className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
//     >
//       <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-lime-500" />
//     </a>
//   );
// };

const UserAvatarClosed = () => {
  return (
    <a className="relative z-20 flex items-center space-x-2 py-1">
      <Image
        width={50}
        height={50}
        src="/assets/avatar.png"
        className="h-7 w-7 shrink-0 rounded-full"
        alt="Avatar"
      />
    </a>
  );
};
