
export interface AuthState {
    validating: Boolean,
    isValid: Boolean,
    token: string | null,
    username: string,
    password: string
}

interface LoginPayload {
    username: string,
    password: string
}

export type AuthAction =
    | { type: 'logout' }
    | { type: 'login', payload: LoginPayload }