type TaskStatus = "todo" | "progress" | "done";

interface ITask {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  created: Date;
}

type TaskState = {
  tasks: ITask[];
};

type TaskAction = {
  type: string;
  task: ITask;
};

type DispatchType = (args: TaskAction) => TaskAction;
actionTypes.ts;
