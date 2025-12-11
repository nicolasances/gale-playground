import { Request } from "express";
import { ExecutionContext, TotoDelegate, UserContext, ValidationError } from "toto-api-controller";
import { ControllerConfig } from "../Config";
import { PlaygroundStore } from "../store/PlaygroundStore";

export class GetAgentExperiments implements TotoDelegate {

    async do(req: Request, userContext: UserContext, execContext: ExecutionContext): Promise<any> {

        const config = execContext.config as ControllerConfig;

        const agentId = req.params['agentId'];

        if (!agentId) throw new ValidationError(400, "Missing required parameter: agentId");

        // 1. Create the mongo client
        const mongoClient = await config.getMongoClient();
        const db = mongoClient.db(config.getDBName());

        // 2. Retrieve the experiments for the agent
        const experiments = await new PlaygroundStore(db, execContext).getAgentExperiments(agentId);

        // 3. Return success
        return { experiments };

    }

}