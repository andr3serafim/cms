'use client'
import { Toaster } from 'react-hot-toast'

export default function ToasterClient() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                className: 'bg-background_light text-cinza1 dark:bg-gray-800 dark:text-white border border-cinza4 dark:border-cinza2',
            }}
        />
    );
}
