export type CreateUserData = {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
}

export type ResponseUserData = Omit<CreateUserData, 'password'>