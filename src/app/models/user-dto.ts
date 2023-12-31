export interface UserDTO {

    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: 'MALE' | 'FEMALE';
    roles?: string[];
}