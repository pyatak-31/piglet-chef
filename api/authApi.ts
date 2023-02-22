import { LoginRequestData, LoginResponseData, RefreshResponseData } from "~~/type/auth";

export const authApi = () => {
    const config = useRuntimeConfig();

    const signIn = (body: LoginRequestData) =>
        $fetch<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword`, {
            method: 'POST',
            params: {
                key: config.FIREBASE_API_KEY
            },
            body: { ...body, returnSecureToken: true }
        });

    const refreshToken = (refreshToken: string | null) => 
        $fetch<RefreshResponseData>(`https://securetoken.googleapis.com/v1/token`, {
            method: 'POST',
            params: {
                key: config.FIREBASE_API_KEY
            },
            body: { refresh_token: refreshToken, grant_type: 'refresh_token' }
        });

    return { signIn, refreshToken };
};
