import { FirebaseError } from "~~/type/error";

export const useFirebase = () => {
    const config = useRuntimeConfig();

    const getErrorMessage = (error: Array<FirebaseError>) => {
        let answer = 'Не удалось определить ошибку';
        error.forEach((el) => {
            answer = getMessage(el);
        });
        return answer;
    };

    const getMessage = (error: FirebaseError): string => {
        switch (error.message) {
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
            case 'INVALID_EMAIL':
                return 'Не верно указан email или пароль';
                break;
            case 'USER_DISABLED':
                return 'Учетная запись была отключена администратором';
                break;
            case 'TOKEN_EXPIRED':
                return 'Учетные данные не действительны. Вам нужно снова войти в систему.';
                break;
            case 'USER_NOT_FOUND':
                return 'Пользователь не найден.';
                break;
            case 'INVALID_REFRESH_TOKEN':
                return 'Предоставлен недопустимый токен обновления.';
                break;
            case 'INVALID_GRANT_TYPE':
                return 'Указан недопустимый тип гранта.';
                break;
            case 'MISSING_REFRESH_TOKEN':
                return 'Токен обновления не предоставлен.';
                break;
            default: return 'Не удалось определить ошибку';
        }
    };

    const convertDbResponse = (data: Object) => {
        return Object.entries(data).map(([id, value]) => ({ ...value, id }));
    };

    return { getErrorMessage, getMessage, convertDbResponse };
};
