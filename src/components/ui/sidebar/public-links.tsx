import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";

export const publicLinks = [
    {
        label: "Dashboard",
        href: "#",
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
        href: "#",
        icon: <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
];
