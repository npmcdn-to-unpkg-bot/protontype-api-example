import {BaseModel} from "protontype-api/dist/models/BaseModel";
import {TasksModel} from "../models/TasksModel";
import {ExpressRouter} from "protontype-api/dist/routes/ExpressRouter";
import {Method} from "protontype-api/dist/routes/Method";
import {Route} from "protontype-api/dist/libs/RouteConfigLoader";

/**
 * @author Humberto Machado
 * Router example using decorator @Route and model
 */
export class TasksRouter extends ExpressRouter {

    public getModelInstances(): BaseModel[] {
        return [new TasksModel()];
    }

    public getBaseUrl(): string {
        return '/tasks';
    }

    @Route({
        method: Method.GET,
        endpoint: '',
        modelName: TasksModel.MODEL_NAME
    })
    public findAllTasks(req, res, tasks: TasksModel) {
        tasks.find({})
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.POST,
        endpoint: '',
        modelName: TasksModel.MODEL_NAME
    })
    public createTask(req, res, tasks: TasksModel) {
        tasks.create(req.body)
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.GET,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public findOneTask(req, res, tasks: TasksModel) {
        tasks.findOne({ where: req.params })
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.PUT,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public updateTask(req, res, tasks: TasksModel) {
        tasks.update(req.body, { where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.DELETE,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public deleteTask(req, res, tasks: TasksModel) {
        tasks.destroy({ where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }
}