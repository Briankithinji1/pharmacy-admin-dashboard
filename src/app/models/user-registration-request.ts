export interface UserRegistrationRequest {

    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    gender?: 'MALE' | 'FEMALE';
}