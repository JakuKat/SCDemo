import { nanoid } from "nanoid";
import { TaskGridList } from "./TaskGridList";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const filters: Array<TaskStatus> = ["todo", "progress", "done"];

export const TaskGrid = () => {
  const tasks = useSelector((state: RootState) => state.tasksReducer.tasks);

  return (
    <ul role="grid" className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 items-start">
      {filters.map((filteredType: TaskStatus) => (
        <TaskGridList
          key={nanoid()}
          status={filteredType}
          tasksList={tasks.filter((task: ITask) => task.status == filteredType)}
        />
      ))}
    </ul>
  );
};
