import { LoginResponseData } from "~~/type/auth.interface";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    console.log({ ...body, returnSecureToken: true });
    try {
        const data = await $fetch<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword`, {
            method: 'POST',
            params: {
                key: config.FIREBASE_API_KEY
            },
            body: { ...body, returnSecureToken: true }
        });
        
        // setCookie(event, config.public.ACCESS_TOKEN, data.idToken);
        // setCookie(event, config.public.REFRESH_TOKEN, data.refreshToken);
    
        return data;
    } catch (error) {
    //     // console.log(error);
        return sendError(event, createError({
            message: 'FUCK YOU'
        }));
    }
});
