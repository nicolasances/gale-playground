import { TotoAPIController } from "toto-api-controller";
import { ControllerConfig } from "./Config";

const api = new TotoAPIController(new ControllerConfig({ apiName: "gale-playground" }, {defaultHyperscaler: "aws", defaultSecretsManagerLocation: "aws"}), { basePath: '/galeplayground' });

// api.path('POST', '/something', new PostSomething())

api.init().then(() => {
    api.listen()
});