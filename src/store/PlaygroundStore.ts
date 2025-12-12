import { Db } from "mongodb";
import { GalePlaygroundExperiment } from "../model/Experiment";
import { ExecutionContext } from "toto-api-controller";
import { ControllerConfig } from "../Config";

export class PlaygroundStore {

    config: ControllerConfig;

    constructor(private db: Db, private execContext: ExecutionContext) {
        this.config = execContext.config as ControllerConfig;
    }

    /**
     * Saves an experiment to the database
     * 
     * @param experiment the experiment to save
     * @returns 
     */
    async saveExperiment(experiment: GalePlaygroundExperiment): Promise<string> {

        const collection = this.db.collection(this.config.getCollections().experiments);

        const result = await collection.insertOne(experiment);

        return result.insertedId.toHexString();
    }

    /**
     * Retrieves all experiments associated with a given agent.
     * 
     * @param taskId the agent Identifier. 
     * @returns 
     */
    async getAgentExperiments(agentId: string): Promise<GalePlaygroundExperiment[]> {

        const collection = this.db.collection(this.config.getCollections().experiments);

        const docs = await collection.find({ agentId }).sort({ date: -1 }).toArray();

        return docs.map(doc => GalePlaygroundExperiment.fromBSON(doc));
    }

}