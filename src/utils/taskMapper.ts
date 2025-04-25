
import { Task } from "../types/Task.ts";
import frontEndDate from "./dateMapper.ts";

const taskMapper = (task: Task): Task => {
    if (task.updated_at)
        return {
            tasklist_id: task.tasklist_id,
            task: task.task,
            created_at: frontEndDate(task.created_at),
            updated_at: frontEndDate(task.updated_at)
        }
    else return {
        tasklist_id: task.tasklist_id,
        task: task.task,
        created_at: frontEndDate(task.created_at),
        updated_at: null
    }
}

export default taskMapper;