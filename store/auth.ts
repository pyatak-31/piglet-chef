import { defineStore } from 'pinia';
import { LoginRequestData, LoginResponseData, RefreshResponseData } from '~~/type/auth.interface';
import { FirebaseError } from '~~/type/error.interface';

export const useAuthStore = defineStore('auth', () => {
    const { isLoading, hasError, clearError, startLoading, completeLoading } = useStore();
    const { getErrorMessage } = useFirebaseAuth();
    const config = useRuntimeConfig();
    const cookieAccessToken = useCookie(config.public.ACCESS_TOKEN);
    const cookieRefreshToken = useCookie(config.public.REFRESH_TOKEN);

    // state
    const token = ref<string | undefined>(cookieAccessToken.value ?? undefined);
    const error = ref<string | undefined>(undefined);
    
    // getters
    const isAuth =  computed<boolean>(() => Boolean(token.value));

    const login = async (body: LoginRequestData) => {
        startLoading();
        const { data, error: responseError } = await useFetch<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword`, {
            method: 'POST',
            params: {
                key: config.FIREBASE_API_KEY
            },
            body: { ...body, returnSecureToken: true }
        });
        
        if (data.value) {
            console.log(1);
            token.value = data.value?.idToken;
            cookieAccessToken.value = data.value.idToken;
            cookieRefreshToken.value = data.value.refreshToken;
            clearError();
        }

        completeLoading();
        if (responseError.value) {
            error.value = getErrorMessage(responseError.value.data.error.errors);
        } 
    };

    const refresh = async () => {
        // await baseAsyncAction(async () => {
            const data = await $fetch<RefreshResponseData>(`https://securetoken.googleapis.com/v1/token`, {
            method: 'POST',
            params: {
                key: config.FIREBASE_API_KEY
            },
            body: { refresh_token: cookieRefreshToken.value, grant_type: 'refresh_token' }
        });
            // console.log(data);
            token.value = data.access_token;
            cookieAccessToken.value = token.value
            cookieRefreshToken.value = data.refresh_token
        // });
    };

    const logout = async () => {
        await baseAsyncAction(async () => {
            const data = await $fetch(`/api/auth/logout`);
            token.value = undefined;
        });
    };

    return { token, error, hasError, isLoading, isAuth, login, logout, refresh };
});
