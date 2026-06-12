import {DataItem, Executor} from "./executor";

const task = ([]: DataItem []): Promise<void>=>{
    return new Promise(resolve => {})
}

const executor = new Executor(task);
executor.start();