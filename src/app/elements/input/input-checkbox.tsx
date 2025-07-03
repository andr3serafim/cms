'use client'

import React from 'react';

type CheckboxProps = {
    label?: string;
    name?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    zodMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputCheckbox({
    label,
    name,
    checked,
    onChange,
    className,
    zodMessage,
    ...rest
}: CheckboxProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 max-w-[300px] w-full">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    className={`
                        ${className}
                        w-4 h-4 appearance-none border-2 
                        dark:border-cinza2 rounded 
                        focus:outline-none 
                        checked:before:content-['✔'] 
                        checked:before:text-azul1 
                        dark:checked:before:text-white 
                        checked:before:flex 
                        checked:before:justify-center 
                        checked:before:items-center 
                        checked:before:text-xs 
                        checked:before:font-bold
                    `}
                    onChange={onChange}
                    {...rest}
                />
                {label && (
                    <label className="text-cinza1 dark:text-white text-sm font-poppins">
                        {label}
                    </label>
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