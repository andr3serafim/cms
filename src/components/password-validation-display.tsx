import { ValidationRules, ValidationState } from '@/hooks/use-password-validation';
import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

type PasswordValidationDisplayProps = {
    validation: ValidationState;
    rules?: ValidationRules;
    show: boolean;
}

const ValidationItem = ({ isValid, text }: { isValid: boolean, text: string }) => (
    <div className="flex items-center gap-2">
        {isValid ? (
            <FaCheck className="text-green-500" size={12} />
        ) : (
            <FaTimes className="text-red-500" size={12} />
        )}
        <span className={`text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {text}
        </span>
    </div>
);

export default function PasswordValidationDisplay({ 
    validation, 
    rules = {}, 
    show 
}: PasswordValidationDisplayProps) {
    if (!show) return null;

    const { minLength = 8, requireUpperCase = true, requireNumber = true, requireSpecialChar = true } = rules;

    return (
        <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
            <p className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">
                A senha deve conter:
            </p>
            <div className="flex flex-col gap-1">
                <ValidationItem 
                    isValid={validation.hasMinLength} 
                    text={`Mínimo de ${minLength} caracteres`} 
                />
                {requireUpperCase && (
                    <ValidationItem 
                        isValid={validation.hasUpperCase} 
                        text="Pelo menos uma letra maiúscula" 
                    />
                )}
                {requireNumber && (
                    <ValidationItem 
                        isValid={validation.hasNumber} 
                        text="Pelo menos um número" 
                    />
                )}
                {requireSpecialChar && (
                    <ValidationItem 
                        isValid={validation.hasSpecialChar} 
                        text="Pelo menos um caractere especial" 
                    />
                )}
            </div>
        </div>
    );
}