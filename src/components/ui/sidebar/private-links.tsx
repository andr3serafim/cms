'use client'

import {
    IconBrandTabler,
    IconSettings,
    IconPlaylistAdd,
    IconListTree,

} from "@tabler/icons-react";

export const privateLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Criar novo post",
        href: "/post/create",
        icon: <IconPlaylistAdd
            className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Postagens",
        href: "/post",
        icon: <IconListTree className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
];
