interface ErrorItem {
    value: string,
    message: string,
}

export interface ResError {
    message: string,
    errors?: Array<ErrorItem>,
}

export interface FirebaseError {
    message: string,
}

export interface ResponseFirebaseError {
    data: {
        error: {
            errors: Array<FirebaseError>,
            message: 'string',
        }
    }
}
