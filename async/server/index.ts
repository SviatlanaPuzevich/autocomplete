import {DataItem, Executor} from "./executor";

const URL = 'http://localhost:3000/send';
const MAX_CONCURRENT_REQUESTS = 20;
const MAX_RETRY = 3;

const counter = {
    success: 0,
    failed: 0,
    lost: 0,
    skipped: 0,
    processed: 0,

    toString(): string {
        return `
Processed : ${this.processed}
Successful: ${this.success}
Failed    : ${this.failed}
Lost      : ${this.lost} 
Skipped   : ${this.skipped}`
    }
}

const task = async (data: DataItem [], deadline: number): Promise<void> => {
    counter.processed = data.length;
    const workers: Promise<void>[] = [];
    for (let index = 0; index < MAX_CONCURRENT_REQUESTS; index++) {
        workers.push(worker(data, deadline));
    }
    await Promise.all(workers);
    counter.skipped = data.length;
    console.log("--- Final Results ---", counter.toString());

}

const worker = async (data: DataItem [], deadline: number): Promise<void> => {
    while (data.length > 0) {
        if (Date.now() > deadline) {
            break;
        }
        const item = data.pop()!;
        try {
            await processItem(item);
        } catch (error) {

            if (error instanceof Error) {
                console.error(error);
            }

        }
    }
}

const processItem = async (item: DataItem): Promise<void> => {
    for (let attempt = 0; attempt <= MAX_RETRY; attempt++) {
        try {
            await sendRequest(item);
            counter.success++;
            return;
        } catch (error) {

            const message = error instanceof Error ? error.message : '';

            if (message === 'Server Overload') {
                counter.lost++;
                throw error;
            }

            if (message === 'Random Failure') {
                counter.failed++;
            }
        }
    }
};

const sendRequest = async (item: DataItem): Promise<void> => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const result = await response.json();
    console.log('Response :', result);

    if (!response.ok) {
        const errorMessage =
            (result && typeof result === 'object' && 'error' in result)
                ? String(result.error)
                : `HTTP ${response.status}`;

        throw new Error(errorMessage);
    }

}

const executor = new Executor(task);
executor.start();
