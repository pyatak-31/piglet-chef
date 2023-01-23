import { useAuthStore } from '@/store/auth';

export const useAuth = () => {
    const authStore = useAuthStore();
    const router = useRouter();
    
    const token = computed(() => authStore.token)
    const isLoading = computed(() => authStore.isLoading);
    const hasError = computed(() => authStore.hasError);
    const error = computed(() => authStore.error);
    
    const data = ref({
        email: '',
        password: '',
    });
    
    const isEmptyData = computed(() => !data.value.email.length || !data.value.password.length);

    const login = async () => {
        await authStore.login(data.value);
        if (!hasError.value) {
            router.push({ path: '/' });
        }
    };

    const logout = async () => {
        await authStore.logout();
        if (!hasError.value) {
            router.push({ path: '/login' });
        }
    };

    return { data, isLoading, error, hasError, isEmptyData, login, logout, token };
};
