'use client'

import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { useAuthStore } from '@/store/use-auth-store';

export const privateLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Profile",
        href: "#",
        icon: <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Settings",
        href: "#",
        icon: <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Logout",
        function: async () => {
            const logout = useAuthStore.getState().logout;
            await logout();
            // Redirecionar para login, se necessário:
            window.location.href = '/login';
        },
        icon: <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
];
