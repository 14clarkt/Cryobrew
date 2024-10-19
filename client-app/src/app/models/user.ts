export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    role: string;
    currentAP: number;
    maxAP: number;
    shortAP: number;
    apcSlots: number;
    email: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

export interface UserEditValues {
    currentAP: number;
    maxAP: number;
    shortAP: number;
    apcSlots: number;
}