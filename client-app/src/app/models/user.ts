export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    role: string;
    currentAP: number;
    maxAP: number;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}