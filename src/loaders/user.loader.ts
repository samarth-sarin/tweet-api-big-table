import DataLoader from 'dataloader';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

export function createUserLoader(userService: UserService) {
  return new DataLoader<string, User | null>(async (userIds) => {
    // 1️⃣ Fetch all users in ONE query
    console.log('Batch loading users:', userIds);
    const users = await userService.findByIds(userIds as string[]);

    // 2️⃣ Map users by id
    const userMap = new Map(users.map(user => [user.id, user]));

    // 3️⃣ Return users in the SAME order as userIds
    return userIds.map(id => userMap.get(id) ?? null);
  });
}
