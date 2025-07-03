import { useState, useEffect } from 'react';

export type PasswordMatchValidation = {
    isMatching: boolean;
    message: string;
    showError: boolean;
}

export function usePasswordMatch(
    password: string,
    confirmPassword: string,
    enableValidation: boolean = true
): PasswordMatchValidation {
    const [validation, setValidation] = useState<PasswordMatchValidation>({
        isMatching: true,
        message: '',
        showError: false
    });

    useEffect(() => {
        if (!enableValidation) {
            setValidation({
                isMatching: true,
                message: '',
                showError: false
            });
            return;
        }

        // Só mostra erro se o campo de confirmação não estiver vazio
        if (confirmPassword === '') {
            setValidation({
                isMatching: true,
                message: '',
                showError: false
            });
            return;
        }

        const isMatching = password === confirmPassword;
        const message = isMatching ? '' : 'As senhas não coincidem';
        const showError = !isMatching && confirmPassword !== '';

        setValidation({
            isMatching,
            message,
            showError
        });
    }, [password, confirmPassword, enableValidation]);

    return validation;
}
