import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCreadentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCreadentialDto);
  }
  @Post('/signin')
  signIn(
    @Body() authCreadentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCreadentialDto);
  }
}
