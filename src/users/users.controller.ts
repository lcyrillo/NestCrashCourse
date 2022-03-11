import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @ApiOkResponse({type: User, isArray: false})
    @ApiQuery({name: 'name', required: false})
    @Get()
    getUsers(@Query('name') name?: string): User[] {
        return this.usersService.findAll(name);
    }

    @ApiOkResponse({type: User, isArray: true })
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User {

        const user = this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @ApiCreatedResponse({ type: User })
    @ApiBadRequestResponse()
    @Post()
    create(@Body() body: UserDto): User {
        return this.usersService.create(body);
    }
}
