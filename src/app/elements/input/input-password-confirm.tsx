'use client'

import { usePasswordMatch } from '@/hooks/use-password-match';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

type InputPasswordConfirmProps = {
    label?: string;
    placeholder?: string;
    fontSize?: string;
    required?: boolean;
    name?: string;
    value?: string;
    originalPassword: string; // Senha original para comparar
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    width?: string;
    labelStyle?: string;
    zodMessage?: string;
    enableMatchValidation?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputPasswordConfirm({
    label,
    placeholder,
    fontSize,
    required,
    name,
    value: initialValue,
    originalPassword,
    onChange,
    className,
    width,
    labelStyle,
    zodMessage,
    enableMatchValidation = true,
    ...rest
}: InputPasswordConfirmProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(initialValue || '');

    const matchValidation = usePasswordMatch(
        originalPassword,
        value.toString(),
        enableMatchValidation
    );

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue)
        }
    }, [initialValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (onChange) {
            onChange(e);
        }

    };

    // Prioriza a mensagem do Zod, depois a mensagem de matching
    const errorMessage = zodMessage || (matchValidation.showError ? matchValidation.message : '');
    const hasError = !!(zodMessage || matchValidation.showError);

    return (
        <div className={`flex flex-col gap-2 ${width ?? "max-w-[480px] w-full"}`}>
            {label && (
                <label className={`${labelStyle ?? 'text-cinza1 dark:text-white'} text-sm font-poppins`}>
                    {label}
                </label>
            )}

            <div className={`relative ${width ?? "max-w-[480px] w-full"}`}>
                <input
                    value={value}
                    name={name}
                    required={required}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`
                        ${className} 
                        ${width ?? "max-w-[480px] w-full"} 
                        h-[38px] py-3 pl-4 pr-10 
                        border rounded-md 
                        focus:outline-none text-black 
                        focus:ring-2 focus:ring-gray-400 
                        dark:bg-white 
                        ${fontSize ?? "text-sm"}
                        ${hasError ? 'border-red-400' : 'border-cinza3'}
                    `}
                    onChange={handleChange}
                    {...rest}
                />
                <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white cursor-pointer"
                >
                    {showPassword ? (
                        <IoEyeOff size={18} className="text-gray-400" />
                    ) : (
                        <IoEye size={18} className="text-gray-400" />
                    )}
                </div>
            </div>

            {errorMessage && (
                <span className="text-red-400 font-sans text-xs">
                    * {errorMessage}
                </span>
            )}
        </div>
    );
}