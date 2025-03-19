import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService , private config: ConfigService ,private jwt: JwtService) {}

    async signup(body: AuthDto) {
        const hashedPassword = await argon.hash(body.password); // Hashing the Password
        try{
            const user = await this.prisma.user.create({                             // Creating a new user in mongoDB 
                data: {
                    username: body.username,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    username: true
                }
            });
    
            return this.signToken(user.id , user.username);
        
        }catch(error){
            if(error  instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException("Username already Taken")
                }
            }
            throw error;
        }
    }

    async signin(body: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: body.username
            }
        });

        if(!user){
            throw new ForbiddenException("You dont have an account. Please SignUp")
        }

        const passwordMatch = await argon.verify(user.password,body.password);

        if(!passwordMatch){
            throw new ForbiddenException("Wrong Password");
        }

        return this.signToken(user.id , user.username);
    }

    async signToken(userId: string , username: string): Promise<{token: string}> {
        const payload = {sub: userId , username};

        const token = await this.jwt.signAsync(payload,{
            secret: this.config.get("JWT_SECRET")
        });
        
        return { token: token }
    }
}