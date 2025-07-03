import ToasterClient from "@/components/toaster-client-side";
import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

// Configuração de SEO do site:

export const metadata: Metadata = {
  metadataBase: new URL('https://www.site.com.br'),
  title: "Título da página que aparece na aba do navegador",
  description: "Descrição do site que aparece nos resultados de busca",
  icons: {
    icon: "/assets/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://www.site.com.br",
    title: "Título do site que aparece nos resultados de busca",
    description: "Descrição do site que aparece nos resultados de busca",
    siteName: "Nome do site",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo do Nome do site"
      }
    ]
  },
  robots: {
    follow: true,
    index: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`flex flex-col`}>
        <ToasterClient />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen w-full">
            {/* <SidebarLayout links={publicLinks} user={user}>
              </SidebarLayout> */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
