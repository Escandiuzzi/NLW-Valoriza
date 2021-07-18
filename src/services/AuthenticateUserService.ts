import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {

        const userRepositories = getCustomRepository(UsersRepositories);
        const invalidAuthMessage = "Email/Password incorrect";
        const user = await userRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error(invalidAuthMessage);
        }

        const passwordMatch = compare(password, (await user).password);

        if (!passwordMatch) {
            throw new Error(invalidAuthMessage);
        }

        const token = sign({
            email: user.email
        }, process.env['TOKEN_SECRET'], {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }
}

export { AuthenticateUserService }