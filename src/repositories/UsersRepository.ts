import User from '../models/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findById( id: String ): Promise< User | null> {
    const findUser = await this.findOne({
        where: { id : id },
    });

    return findUser || null;
  }
}

export default UsersRepository;
