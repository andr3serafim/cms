'use client'

import React, { useEffect, useState } from 'react';

type InputProps = {
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    fontSize?: string;
    required?: boolean;
    name?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    width?: string;
    labelStyle?: string;
    backgroundColor?: string;
    zodMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputDefault({
    label,
    placeholder,
    icon,
    fontSize,
    required,
    name,
    value: initialValue,
    onChange,
    className,
    width,
    labelStyle,
    backgroundColor,
    zodMessage,
    type = "text",
    ...rest
}: InputProps) {

    const [value, setValue] = useState(initialValue || '');


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
                    type={type}
                    placeholder={placeholder}
                    className={`
                        ${className} 
                        ${width ?? "max-w-[480px] w-full"} 
                        ${backgroundColor ?? "bg-white"}
                        h-[38px] py-3 pl-4 pr-10 
                        border border-cinza3 rounded-md 
                        focus:outline-none text-gray-800
                        focus:ring-2 focus:ring-gray-400 
                        ${fontSize ?? "text-sm"}
                        ${zodMessage ? 'border-red-400' : ''}
                    `}
                    onChange={handleChange}
                    {...rest}
                />
                {icon && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white">
                        {icon}
                    </div>
                )}
            </div>

            {zodMessage && (
                <span className="text-red-400 font-sans text-xs">
                    * {zodMessage}
                </span>
            )}
        </div>
    );
}
