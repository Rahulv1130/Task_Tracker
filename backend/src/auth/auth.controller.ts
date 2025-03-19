import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private userService: AuthService) {}

    @Post("signup")                 // Route for User signUp
    signup(@Body() body: AuthDto) {
        return this.userService.signup(body);
    }

    @Post("signin")                 // Route for User signIn
    signin(@Body() body: AuthDto) {
        return this.userService.signin(body);
    }
}
