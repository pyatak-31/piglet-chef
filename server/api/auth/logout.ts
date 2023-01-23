export default defineEventHandler((event) => {
    const config = useRuntimeConfig();
    deleteCookie(event, config.public.ACCESS_TOKEN);
    deleteCookie(event, config.public.REFRESH_TOKEN);
    return true;
});
