import { User } from './user.model';
import { RedisService } from 'src/redis/redis.service';
export declare class UserService {
    private readonly userModel;
    private readonly redisService;
    constructor(userModel: typeof User, redisService: RedisService);
    createUser(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<User>;
    updateFirstName(userId: string, firstName: string): Promise<User>;
    login(email: string, password: string): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<any>;
    findByIds(ids: string[]): Promise<any[]>;
    updateNames(id: string, firstName: string, lastName: string): Promise<User>;
}
