import { ValidationError } from "toto-api-controller";

export class GalePlaygroundExperiment {

    agentId: string; 
    taskInputData: any; 
    playground: PlaygroundSettings;

    constructor({agentId, taskInputData, playground}: {agentId: string; taskInputData: any; playground: PlaygroundSettings}) {
        this.agentId = agentId;
        this.taskInputData = taskInputData;
        this.playground = playground;
    }

    static fromHTTPBody(body: any): GalePlaygroundExperiment {

        // Validate that all the required fields are present
        if (!body.agentId) throw new ValidationError(400, "Missing required field: agentId");
        if (!body.taskInputData) throw new ValidationError(400, "Missing required field: taskInputData");
        if (!body.playground) throw new ValidationError(400, "Missing required field: playground");
        if (!body.playground.promptOverride) throw new ValidationError(400, "Missing required field: playground.promptOverride");

        return new GalePlaygroundExperiment({
            agentId: body.agentId,
            taskInputData: body.taskInputData,
            playground: body.playground
        });
    }

    static fromBSON(bson: any): GalePlaygroundExperiment {

        return new GalePlaygroundExperiment({
            agentId: bson.agentId,
            taskInputData: bson.taskInputData,
            playground: {
                promptOverride: bson.playground.promptOverride
            }
        });
    }

}

export interface PlaygroundSettings {
    promptOverride: string;
}