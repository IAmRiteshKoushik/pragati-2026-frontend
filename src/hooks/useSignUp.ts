
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AuthService } from '../services/authService';
import toast from 'react-hot-toast';

const hashPassword = async (password: string) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: any) => {
            const hashedPassword = await hashPassword(data.password);
            const payload = { ...data, password: hashedPassword };

            // Derive roll number logic if needed, for now just pass data

            return await AuthService.signUp(payload);
        },
        onSuccess: () => {
            toast.success('Account Created! Please verify your email.');
            // Redirect to verification page or login
            // navigate({ to: '/signup/verify' }); 
            navigate({ to: '/login' });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Signup Failed');
        },
    });
};
