export type CreateUserData = {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
}

export type ResponseUserData = Omit<CreateUserData, 'password'>

export type UpdateUserData = {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}