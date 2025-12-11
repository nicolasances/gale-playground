import { ValidationError } from "toto-api-controller";

export class GalePlaygroundExperiment {

    date: Date;
    agentId: string; 
    taskInputData: any; 
    playground: PlaygroundSettings;

    constructor({date, agentId, taskInputData, playground}: {date: Date; agentId: string; taskInputData: any; playground: PlaygroundSettings}) {
        this.date = date;
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
            date: new Date(body.date) || new Date(),
            agentId: body.agentId,
            taskInputData: body.taskInputData,
            playground: body.playground
        });
    }

    static fromBSON(bson: any): GalePlaygroundExperiment {

        return new GalePlaygroundExperiment({
            date: bson.date,
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