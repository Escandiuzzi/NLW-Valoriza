import { response } from "express";
import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories";
interface ITagRequest {
    name: string
}

class CreateTagService {
    async execute({ name }: ITagRequest) {
        if (!name) {
            throw Error("Incorrect name!")
        }

        const tagsRepository = getCustomRepository(TagsRepositories);

        const tagAlreadyExists = await tagsRepository.findOne({
            name
        });

        if (tagAlreadyExists) {
            throw Error("Tag already exists!")
        }

        const tag = tagsRepository.create({
            name
        });

        await tagsRepository.save(tag);

        return tag;

    }
}

export { CreateTagService }