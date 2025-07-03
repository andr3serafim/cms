'use client'

import PasswordValidationDisplay from '@/components/password-validation-display';
import { usePasswordValidation, ValidationRules } from '@/hooks/use-password-validation';
import React, { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

type InputPasswordProps = {
    label?: string;
    placeholder?: string;
    fontSize?: string;
    required?: boolean;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    width?: string;
    zodMessage?: string;
    showValidation?: boolean;
    validationRules?: ValidationRules;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputPassword({
    label,
    placeholder,
    fontSize,
    required,
    name,
    value: initialValue,
    onChange,
    className,
    width,
    zodMessage,
    showValidation = false,
    validationRules,
    ...rest
}: InputPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showValidationPanel, setShowValidationPanel] = useState(false);
    const [value, setValue] = useState(initialValue || '');

    const validation = usePasswordValidation(
        value.toString(),
        validationRules,
        showValidation
    );

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFocus = () => {
        if (showValidation) {
            setShowValidationPanel(true);
        }
    };

    const handleBlur = () => {
        setShowValidationPanel(false);
    };

    const hasValidationError = showValidation && !validation.isValid && value !== '';

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
                <label className="text-cinza1 dark:text-white text-sm font-poppins">
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
                        ${hasValidationError ? 'border-red-400' : 'border-cinza3'}
                    `}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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

            {zodMessage && (
                <span className="text-red-400 font-sans text-xs">
                    * {zodMessage}
                </span>
            )}

            <PasswordValidationDisplay
                validation={validation}
                rules={validationRules}
                show={showValidationPanel && showValidation}
            />
        </div>
    );
}
