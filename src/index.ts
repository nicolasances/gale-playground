import { TotoAPIController } from "toto-api-controller";
import { ControllerConfig } from "./Config";
import { PostExperiment } from "./dlg/PostExperiment";
import { GetAgentExperiments } from "./dlg/GetAgentExperiments";

const api = new TotoAPIController(new ControllerConfig({ apiName: "gale-playground" }, {defaultHyperscaler: "aws", defaultSecretsManagerLocation: "aws"}), { basePath: '/galeplayground' });

api.path('POST', '/experiments', new PostExperiment());
api.path('GET', '/agents/:agentId/experiments', new GetAgentExperiments());

api.init().then(() => {
    api.listen()
});

const shutdown = async () => {

    console.log('Shutting down gracefully...');
    
    await ControllerConfig.closeMongoClient();
    
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);