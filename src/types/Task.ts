export interface Task {
    "tasklist_id": number,
    "task": string,
    "created_at": string,
    "updated_at": string | null,
    "is_done": boolean
}