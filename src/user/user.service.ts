import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RedisService } from 'src/redis/redis.service';
import { hashPassword } from '../auth/password.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly redisService: RedisService
  ) {}

async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const passwordHash = await hashPassword(data.password);

    return User.create({
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
    });
}

/*
  test method that changes the first name of the user
*/
async updateFirstName(userId: string, firstName: string): Promise<User> {
  const user = await this.findById(userId);

  if (!user) {
    throw new Error('User doesnt exist');
  }

  user.firstName = firstName;
  await user.save();

  return user;
}

/*
  logIn method hashes inputted password and compares against the hashed password
  stored in db. If there is a match, then user is successfully logged in.
*/
async login(email: string, password: string) {
  const user = await this.userModel.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new Error('Invalid credentials');
  }

  return user;
}

/*
  findAll method used to search for all users inside database.
  Used specifically for the query type
*/
async findAll(): Promise<User[]> {
  console.log('[UserService] findAll() method called');
  return User.findAll();
}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: string) {
    const redis = this.redisService.getClient();
    const catcheKey = `user:${id}`;
    const cached = await redis.get(catcheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const user = await User.findByPk(id);
    if (!user) return null;

    await redis.set(
      catcheKey,
      JSON.stringify(user),
      'EX',
      60 * 60, // 1 hour TTL 
    );

    return user;
  }

async findByIds(ids: string[]) {
  const timestampStartInMilliseconds: number = Date.now()
  const redis = this.redisService.getClient();
  const prefix = 'user:';

  const keys = ids.map(id => `${prefix}${id}`);
  const cachedValues = await redis.mget(keys);

  const cachedUsers = new Map<string, any>();
  const missingIds: string[] = [];

  // Step 1: Separate hits & misses
  cachedValues.forEach((value, index) => {
    const id = ids[index];

    if (value) {
      cachedUsers.set(id, JSON.parse(value));
    } else {
      missingIds.push(id);
    }
  });

  // Step 2: Fetch missing users from DB
  let dbUsers: any[] = [];
  if (missingIds.length > 0) {
    console.log("Cache Miss");

    dbUsers = await this.userModel.findAll({
      where: { id: missingIds },
    });

    // Step 3: Backfill Redis
    const pipeline = redis.pipeline();
    for (const user of dbUsers) {
      pipeline.set(
        `${prefix}${user.id}`,
        JSON.stringify(user),
        'EX',
        60 * 60,
      );
      cachedUsers.set(user.id, user);
    }
    await pipeline.exec();
  }
  else {
    console.log("Complete Cache Hit");
  }

  const timestampEndInMilliseconds: number = Date.now()

  console.log(`findByIds took ${timestampEndInMilliseconds - timestampStartInMilliseconds}`);

  // Step 4: Return results in the SAME ORDER as ids
  return ids.map(id => cachedUsers.get(id) ?? null);
}


  /*
    takes in firstName and lastName as parameters and changes the name of the userId in the db.
  */
  async updateNames(
    id: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.firstName = firstName;
    user.lastName = lastName;
    return user.save();
  }
}