import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string,
    email: string,
    password: string,
    admin?: boolean
}

class CreateUserService {
    async execute({ name, email, password, admin = false }: IUserRequest) {

        if (!email) {
            throw Error("Email incorrect!");
        }
        const userRepositories = getCustomRepository(UsersRepositories);

        const userAlreadyExists = await userRepositories.findOne({
            email
        });

        if (userAlreadyExists) {
            throw Error("User already exists!");
        }
        const passwordHash = await hash(password, 8);

        const user = userRepositories.create({
            name,
            email,
            password: passwordHash,
            admin,
        })

        await userRepositories.save(user);

        return user;

    }
}

export { CreateUserService }