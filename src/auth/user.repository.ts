import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as argon2 from 'argon2';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const hashedPassword = await argon2.hash(password);
    const user = this.create({
      password: hashedPassword,
      username,
    });
    await this.save(user);
  }
}
