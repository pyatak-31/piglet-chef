import { defineStore } from 'pinia';
import { DecodeToken, LoginRequestData } from '~~/type/auth';
import jwtDecode from "jwt-decode";
import { ResponseFirebaseError } from '~~/type/error';
import { authApi } from '~~/api/authApi';

export const useAuthStore = defineStore('auth', () => {
    const { isLoading,  startLoading, completeLoading } = useLoadingStore();
    const { error, hasError, clearError, addError } = useErrorStore();
    const { signIn, refreshToken } = authApi();
    const { getErrorMessage, getMessage } = useFirebase();
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
        try {
            startLoading();
            const data = await signIn(body);
            token.value = data.idToken;
            cookieAccessToken.value = data.idToken;
            cookieRefreshToken.value = data.refreshToken;
            clearError();
        } catch (err) {
            addError(getErrorMessage((err as ResponseFirebaseError).data.error.errors));
        } finally {
            completeLoading();
        }
    };

    const refresh = async () => {
        try {
            const data = await refreshToken(cookieAccessToken.value);
            token.value = data.access_token;
            cookieAccessToken.value = token.value;
            cookieRefreshToken.value = data.refresh_token;
            clearError();
        } catch (err) {
            addError(getMessage((err as ResponseFirebaseError).data.error));
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

    return {
        token,
        error,
        hasError,
        isLoading,
        isAuth,
        isValidToken,
        login,
        logout,
        refresh,
        checkToken
    };
});
