import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { TagsRepositories } from "../repositories/TagsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { mail } from "./MailService";

interface IComplimentRequest {
    user_sender: string,
    user_receiver: string,
    tag_id: string,
    message: string
}

class CreateComplimentService {
    async execute({ user_sender, user_receiver, tag_id, message }: IComplimentRequest) {

        if (user_sender === user_receiver) {
            throw Error("Invalid user");
        }

        const usersRepositories = getCustomRepository(UsersRepositories);

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User Receiver does not exists!");
        }

        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tagExists = await tagsRepositories.findOne(tag_id);

        if (!tagExists) {
            throw Error("Tag does not exists!");
        }

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliment = complimentsRepositories.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        })

        await complimentsRepositories.save(compliment);

        const userSender = await usersRepositories.findOne(user_sender);

        console.log(compliment);

        await mail(userReceiverExists.email, userSender.name, tagExists.name, compliment.message);

        return compliment;

    }
}

export { CreateComplimentService }