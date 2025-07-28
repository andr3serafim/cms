// components/ThemeToggle.js
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-500 dark:border-gray-700"
        >
            {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
                <MoonIcon className="h-5 w-5 text-gray-900" />
            )}
        </button>
    )
}

export default ThemeToggle