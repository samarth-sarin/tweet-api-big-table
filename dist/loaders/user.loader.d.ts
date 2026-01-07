import DataLoader from 'dataloader';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
export declare function createUserLoader(userService: UserService): DataLoader<string, User | null, string>;
