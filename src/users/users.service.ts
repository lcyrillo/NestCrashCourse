import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [{ id: 0, name: 'Lucas'}, { id: 1, name: 'Lucas'}, { id: 2, name: 'Dustin'}];

    findAll(name?: string): User[] {
        if (name) {
            return this.users.filter(user => user.name === name);
        }
        return this.users;
    }

    findById(userId: number): User {
        return this.users.find(user => user.id === userId);
    }

    create(userDto: UserDto): User {
        const newUser = { id: Date.now(), ...userDto };

        this.users.push(newUser);

        return newUser;
    }
}
