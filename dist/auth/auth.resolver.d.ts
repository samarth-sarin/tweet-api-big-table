import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: import("../user/user.model").User;
    }>;
}
