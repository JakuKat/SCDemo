import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment";
import { nanoid } from "nanoid";

const initialState: {
  tasks: Array<ITask>;
  isDetailOverlayVisible: boolean;
  taskDetail: ITask | undefined;
} = {
  tasks: [
    {
      id: nanoid(),
      name: "Task 1",
      description: "lorem lorem",
      status: "todo",
      created: moment().toDate(),
    },
    {
      id: nanoid(),
      name: "Task 2",
      description: "lorem lorem",
      status: "todo",
      created: moment().subtract(1, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 3",
      description: "lorem lorem",
      status: "todo",
      created: moment().subtract(10, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 4",
      description: "lorem lorem",
      status: "todo",
      created: moment().subtract(100, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 5",
      description: "lorem lorem",
      status: "progress",
      created: moment().subtract(1000, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 6",
      description: "lorem lorem",
      status: "done",
      created: moment().subtract(2, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 7",
      description: "lorem lorem",
      status: "done",
      created: moment().subtract(20, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 8",
      description: "lorem lorem",
      status: "done",
      created: moment().subtract(200, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 9",
      description: "lorem lorem",
      status: "progress",
      created: moment().subtract(200, "days").toDate(),
    },
    {
      id: nanoid(),
      name: "Task 10",
      description: "lorem lorem",
      status: "todo",
      created: moment().subtract(2000, "days").toDate(),
    },
  ],
  isDetailOverlayVisible: false,
  taskDetail: undefined,
};

const orderTaskList = (tasks: Array<ITask>): Array<ITask> => {
  return _.orderBy(tasks, ["todo", "progress", "done"]);
};

const customTaskSplice = (
  tasks: Array<ITask>,
  startIndex: number,
  endIndex: number
) => {
  const [removed] = tasks.splice(startIndex, 1);
  tasks.splice(endIndex, 0, removed);

  return tasks;
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const newTask: ITask = {
        ...action.payload,
      };
      return {
        ...state,
        tasks: state.tasks.concat(newTask),
      };
    },
    editTask: (
      state,
      action: PayloadAction<{ task: ITask; startIndex?: number; endIndex: number }>
    ) => {
      const { task, startIndex, endIndex } = action.payload;
      const filteredTasks = state.tasks
        .filter((filteredTask: ITask) => filteredTask.id !== task.id)
        .concat(task);
      const sortedTasks: Array<ITask> = orderTaskList(filteredTasks);
      const filteredSortedTasks = sortedTasks.filter(
        (sortedTask) => sortedTask.status === task.status
      );

      let newTasks: Array<ITask> = filteredSortedTasks;

      if (startIndex == undefined && endIndex != undefined) {
        const currentIndex = filteredSortedTasks.findIndex(
          (sortedTask) => sortedTask.id == task.id
        );
        newTasks = customTaskSplice(filteredSortedTasks, currentIndex, endIndex);
      } else if (startIndex != undefined && endIndex != undefined) {
        newTasks = customTaskSplice(filteredSortedTasks, startIndex, endIndex);
      }

      const updatedTasks = sortedTasks
        .filter((sortedTask) => sortedTask.status !== task.status)
        .concat(newTasks);

      return {
        ...state,
        tasks: updatedTasks,
      };
    },
    removeTask: (state, action: PayloadAction<ITask>) => {
      const updatedTasks: ITask[] = state.tasks.filter(
        (task: ITask) => task.id !== action.payload.id
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    },
    showTaskDetailOverlay: (state, action: PayloadAction<ITask>) => {
      return {
        ...state,
        isDetailOverlayVisible: true,
        taskDetail: action.payload,
      };
    },
    hideTaskDetailOverlay: (state) => {
      return {
        ...state,
        isDetailOverlayVisible: false,
        taskDetail: undefined,
      };
    },
  },
});

export const {
  addTask,
  editTask,
  removeTask,
  showTaskDetailOverlay,
  hideTaskDetailOverlay,
} = taskSlice.actions;
export default taskSlice.reducer;
