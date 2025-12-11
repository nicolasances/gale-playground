import { Request } from "express";
import { ExecutionContext, TotoDelegate, UserContext } from "toto-api-controller";
import { ControllerConfig } from "../Config";
import { GalePlaygroundExperiment } from "../model/Experiment";
import { PlaygroundStore } from "../store/PlaygroundStore";

export class PostExperiment implements TotoDelegate {

    async do(req: Request, userContext: UserContext, execContext: ExecutionContext): Promise<any> {

        const config = execContext.config as ControllerConfig;


        // 1. Create the mongo client
        const mongoClient = await config.getMongoClient();
        const db = mongoClient.db(config.getDBName());

        // 2. Insert the experiment document
        const experiment = GalePlaygroundExperiment.fromHTTPBody(req.body);

        const experimentId = await new PlaygroundStore(db, execContext).saveExperiment(experiment);

        // 3. Return success
        return { experimentId };

    }

}