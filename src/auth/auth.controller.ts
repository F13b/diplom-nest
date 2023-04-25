import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {Request, Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signIn')
    async signIn(@Body() data: {email: string, password: string}, @Res() response: Response) {
        const userData = await this.authService.signIn(data.email, data.password);
        response.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return response.json(userData);
    }

    @Post('logout')
    async logOut(@Req() request: Request) {
        const token: string = request.cookies['refreshToken'];
        return this.authService.logout(token);
    }

    @Get('refresh')
    async refreshToken(@Req() request: Request, @Res() response: Response) {
        const token: string = request.cookies['refreshToken'];
        const data = await this.authService.refresh(token);
        response.cookie('refreshToken', data.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        return response.json(data);
    }
}
