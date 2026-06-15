import {DataItem, Executor} from "./executor";

const URL = 'http://localhost:3000/send';
const MAX_CONCURRENT_REQUESTS = 20;
const counter = {
    success: 0,
    failed: 0,
    pending: 0,
    lost: 0,
    skipped: 0,
}

const task = async (data: DataItem [], deadline: number): Promise<void> => {
    const workers: Promise<void>[] = [];
    for (let index = 0; index < MAX_CONCURRENT_REQUESTS; index++) {
        workers.push(worker(data, deadline));
    }
    await Promise.all(workers);
    counter.skipped = data.length;
    console.log("--- Final Results ---", counter);

}

const worker = async (data: DataItem [], deadline: number): Promise<void> => {
    while (data.length > 0) {
        if (Date.now() > deadline) {
            break;
        }
        const item = data.pop()!;
        counter.pending++;
        try {
            await sendRequest(item);
            counter.success++;
        } catch (error) {

            if (error instanceof Error) {
                if (error.message === 'Server Overload') {
                    counter.lost++;
                } else {
                    counter.failed++;
                }
            }

        } finally {
            counter.pending--;
        }
    }
}

const sendRequest = async (item: DataItem): Promise<void> => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const result = await response.json();
    console.log('Successes :', result);

    if (!response.ok) {

        const errorMessage = (result && typeof result === 'object' && 'error' in result)
            ? String(result.error)
            : `Server responded with status ${response.status}`;
        throw new Error(errorMessage);
    }

}

const executor = new Executor(task);
executor.start();
