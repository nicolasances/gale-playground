import { MongoClient } from 'mongodb';
import { TotoControllerConfig, ValidatorProps, Logger, SecretsManager } from "toto-api-controller";

const dbName = 'galeplayground';
const collections = {
    prompts: 'prompts',
};

export class ControllerConfig extends TotoControllerConfig {

    mongoUser: string | undefined;
    mongoPwd: string | undefined;

    async load(): Promise<any> {

        const sm = new SecretsManager(this.hyperscaler == 'local' ? 'aws' : this.hyperscaler, this.env, this.logger!);

        let promises = [];

        promises.push(super.load());

        promises.push(sm.getSecret("gale-playground-mongo-user").then(user => {this.mongoUser = user}));
        promises.push(sm.getSecret("gale-playground-mongo-pswd").then(pwd => {this.mongoPwd = pwd}));
        
        await Promise.all(promises);

    }

    getProps(): ValidatorProps {
        return {}
    }

    async getMongoClient() {

        const mongoUrl = `mongodb://${this.mongoUser}:${this.mongoPwd}@${this.mongoHost}:27017/${dbName}`;

        return await new MongoClient(mongoUrl).connect();
    }
    
    getDBName() { return dbName }
    getCollections() { return collections }

}
