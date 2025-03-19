import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {

    @Get()
    get(@Req() req: any) {
        return "This is Coolllll"
    }
}
