import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: import("../user/user.model").User;
    }>;
}
