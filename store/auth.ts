import { defineStore } from 'pinia';
import { LoginRequestData, LoginResponseData, RefreshResponseData } from '~~/type/auth.interface';
import jwtDecode from "jwt-decode";
import { DecodeToken } from "~~/type/auth.interface";

export const useAuthStore = defineStore('auth', () => {
    const { isLoading, error, hasError, clearError, addError, startLoading, completeLoading } = useStore();
    const { getErrorMessage } = useFirebaseAuth();
    const config = useRuntimeConfig();
    const cookieAccessToken = useCookie(config.public.ACCESS_TOKEN);
    const cookieRefreshToken = useCookie(config.public.REFRESH_TOKEN);

    // state
    const token = ref<string | undefined>(cookieAccessToken.value ?? undefined);
    
    // getters
    const isAuth =  computed<boolean>(() => Boolean(token.value));

    const isValidToken = computed(() => {
        if (token.value) {
            const jwtData = jwtDecode<DecodeToken>(token.value) || {};
            const expires = jwtData.exp || 0;
            console.log(`Токен умрет через: ${ (expires - (new Date().getTime() / 1000)).toFixed() } сек`);
            return (new Date().getTime() / 1000) < expires;
        } 
        
        return false;
    });

    // actions
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
            token.value = data.value?.idToken;
            cookieAccessToken.value = data.value.idToken;
            cookieRefreshToken.value = data.value.refreshToken;
            clearError();
        }

        completeLoading();
        if (responseError.value) {
            // error.value = getErrorMessage(responseError.value.data.error.errors);
            addError(getErrorMessage(responseError.value.data.error.errors));
        } 
    };

    const refresh = async () => {
        try {
            const data = await $fetch<RefreshResponseData>(`https://securetoken.googleapis.com/v1/token`, {
                method: 'POST',
                params: {
                    key: config.FIREBASE_API_KEY
                },
                body: { refresh_token: cookieRefreshToken.value, grant_type: 'refresh_token' }
            });
            
            token.value = data.access_token;
            cookieAccessToken.value = token.value;
            cookieRefreshToken.value = data.refresh_token;
            clearError();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        token.value = undefined;
        cookieAccessToken.value = null;
        cookieRefreshToken.value = null;
        clearError();
    };

    const checkToken = async () => {
        if (!isValidToken.value) {
            await refresh();
        }
    };

    return { token, error, hasError, isLoading, isAuth, isValidToken, login, logout, refresh, checkToken };
});
