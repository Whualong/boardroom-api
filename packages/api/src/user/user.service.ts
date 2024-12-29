
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
    @Inject(RedisService)
    private redisService: RedisService

    @Inject(PrismaService)
    private prismaService: PrismaService

    private logger = new Logger()

    async register(user: RegisterUserDto) {
        const captcha = await this.redisService.get(`captcha_${user.email}`);
        if (!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }
        if (user.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST)
        }
        const havedUser = await this.prismaService.user.findUnique({
            where: {
                username: user.username
            },
        })
        if (havedUser) {
            throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
        }
        try {
            return await this.prismaService.user.create({
                data: {
                    username: user.username,
                    password: user.password,
                    nickName: user.nickName,
                    email: user.email
                },
                select: {
                    id: true,
                    username: true,
                    nickName: true,
                    email: true,
                    headPic: true,
                    createTime: true
                }
            })
        } catch (e) {
            this.logger.error(e, UserService)
            return null;
        }
    }

    async login(loginUser: LoginUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username: loginUser.username
            }
        })
        if (!user) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST)
        }
        if (loginUser.password !== user.password) {
            throw new HttpException('密码错误', HttpStatus.BAD_REQUEST)
        }
        delete user.password
        return user
    }

}
