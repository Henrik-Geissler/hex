import { PlacingQueue } from "../../directories/utils/PlacingQueue";
import { TimeManager } from "../../managers/TimeManager";

export async function executeStep<T>(step: () => Promise<T>): Promise<T> {
    TimeManager.resetCounter(); 
    const result = await step();
    await PlacingQueue.getInstance().Play(); 
    TimeManager.resetCounter();
    return result;
}