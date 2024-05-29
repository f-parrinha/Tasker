import { EmptyID, EmptyTaskDescription, Priority } from "../constants";

export class TaskModel {
    private id: string;
    private description: string;
    private priority: number;

    constructor(id?: string, description?: string, priority?: number) {
        this.id = id ?? EmptyID;
        this.description = description ?? EmptyTaskDescription;
        this.priority = priority ?? Priority.LOW;
    }

    /** SETTERS */
    setId(id: string): void {
        this.id = id;
    }
    setDescription(description: string): void {
        this.description = description;
    }
    setPriority(priority: number): void {
        this.priority = priority;
    }

    /** GETTERS */
    getId(): string {
        return this.id;
    }
    getDescription(): string {
        return this.description;
    }
    getPriority(): number {
        return this.priority;
    }


    /** METHODS */
    data(): object {
        return {
            id: this.id,
            description: this.description,
            priority: this.priority
        }
    }
}

export class TaskModelBuilder {
    private task: TaskModel;

    constructor() {
        this.task = new TaskModel();
    }

    public withId(id: string): TaskModelBuilder {
        this.task.setId(id);
        return this;
    }
    public withDescription(description: string): TaskModelBuilder {
        this.task.setDescription(description);
        return this;
    }
    public withPriority(priority: number): TaskModelBuilder {
        this.task.setPriority(priority);
        return this;
    }
    public build() : TaskModel {
        return this.task;
    }
}