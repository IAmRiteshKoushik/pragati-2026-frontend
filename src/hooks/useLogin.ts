
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AuthService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

// Simple hash function for demo (replace with proper hashing if needed on client side, usually discouraged)
const hashPassword = async (password: string) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const useLogin = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (data: any) => {
            const hashedPassword = await hashPassword(data.password);
            return await AuthService.login(data.email, hashedPassword);
        },
        onSuccess: (user) => {
            setUser(user);
            toast.success('Login Successful!');
            navigate({ to: '/events' }); // Assuming /events route exists, otherwise just /
        },
        onError: (error: any) => {
            toast.error(error.message || 'Login Failed');
        },
    });
};
