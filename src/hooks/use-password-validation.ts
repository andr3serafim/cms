import { useState, useEffect } from 'react';

export type ValidationState = {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    isValid: boolean;
}

export type ValidationRules = {
    minLength?: number;
    requireUpperCase?: boolean;
    requireNumber?: boolean;
    requireSpecialChar?: boolean;
}

const defaultRules: ValidationRules = {
    minLength: 8,
    requireUpperCase: true,
    requireNumber: true,
    requireSpecialChar: true,
};

export function usePasswordValidation(
    password: string, 
    rules: ValidationRules = defaultRules,
    enableValidation: boolean = true
) {
    const [validation, setValidation] = useState<ValidationState>({
        hasMinLength: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isValid: false
    });

    useEffect(() => {
        if (!enableValidation) {
            setValidation({
                hasMinLength: true,
                hasUpperCase: true,
                hasNumber: true,
                hasSpecialChar: true,
                isValid: true
            });
            return;
        }

        const hasMinLength = password.length >= (rules.minLength || 8);
        const hasUpperCase = rules.requireUpperCase ? /[A-Z]/.test(password) : true;
        const hasNumber = rules.requireNumber ? /[0-9]/.test(password) : true;
        const hasSpecialChar = rules.requireSpecialChar 
            ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) 
            : true;

        const isValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

        setValidation({
            hasMinLength,
            hasUpperCase,
            hasNumber,
            hasSpecialChar,
            isValid
        });
    }, [password, rules, enableValidation]);

    return validation;
}