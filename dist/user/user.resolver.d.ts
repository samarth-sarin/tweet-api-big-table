import { UserService } from './user.service';
import { User } from './user.model';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(): Promise<User[]>;
    me(user: User): User;
    createUser(email: string, password: string, firstName: string, lastName: string): Promise<User>;
    updateFirstName(user: User, firstName: string): Promise<User>;
    updateNames(user: User, firstName: string, lastName: string): Promise<User>;
}
