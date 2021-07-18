import { Request, Response } from "express"
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService"

class ListUserSendComplimentsController {
    async handle(request: Request, response: Response) {

        const listUserSendComplimentsService = new ListUserSendComplimentsService();

        const { user_id } = request;

        const compliments = await listUserSendComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserSendComplimentsController }