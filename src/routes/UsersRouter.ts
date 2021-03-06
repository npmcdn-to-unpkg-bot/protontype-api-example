import {BaseModel} from "protontype-api/dist/models/BaseModel";
import {UsersModel} from "../models/UsersModel";
import {BaseCrudRouter} from "protontype-api/dist/routes/BaseCrudRouter";
import {Method} from "protontype-api/dist/routes/Method";
import {TasksModel} from "../models/TasksModel";
import {Route} from "protontype-api/dist/libs/RouteConfigLoader";

/**
 * @author Humberto Machado
 * Example using BaseCrudRouter.
 */
export class UsersRouter extends BaseCrudRouter {

    public getModelInstances(): BaseModel[] {
        return [new UsersModel()];
    }

    public getBaseUrl(): string {
        return '/users';
    }

    // Parâmetro model não é obrgatório
    @Route({
        endpoint: '/:user_id/tasks',
        method: Method.GET
    })
    public tasksFromUser(req, res) {
        let tasks: TasksModel = this.getModel<TasksModel>(TasksModel.MODEL_NAME);
        tasks.find({where: req.params})
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error))
    }
}