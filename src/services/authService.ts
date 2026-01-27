
// This is a mock service. Replace with actual API calls.

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthService = {
    login: async (email: string, passwordHash: string) => {
        await delay(1000); // Simulate network latency
        if (email === 'demo@example.com' && passwordHash) {
            return {
                id: '1',
                name: 'Demo User',
                email: email,
                token: 'mock-jwt-token',
            };
        }
        // Simulate error for other cases if needed, but for now successful for any valid email format in mock
        return {
            id: '1',
            name: 'User',
            email: email,
            token: 'mock-jwt-token',
        };
    },

    signUp: async (userData: any) => {
        await delay(1500);
        console.log('User Registered:', userData);
        return { success: true };
    },
};
