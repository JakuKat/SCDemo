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

const getOrderedTasks = (tasks: Array<ITask>): Array<ITask> => {
  return _.orderBy(tasks, ["todo", "progress", "done"]);
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
        tasks: [newTask, ...state.tasks],
      };
    },
    editTask: (
      state,
      action: PayloadAction<{ task: ITask; startIndex?: number; endIndex?: number }>
    ) => {
      const { task, startIndex, endIndex } = action.payload;
      // update tasks list

      // TODO optimize
      // when users moves task to different column
      if (startIndex == undefined && endIndex != undefined) {
        const filteredTasks = state.tasks
          .filter((filteredTask: ITask) => filteredTask.id !== task.id)
          .concat(task);
        const orderedTasks: Array<ITask> = getOrderedTasks(filteredTasks);
        const filteredSortedTasks = orderedTasks.filter(
          (orderedTask) => orderedTask.status === task.status
        );
        const currentIndex = filteredSortedTasks.findIndex(
          (sortedTask) => sortedTask.id == task.id
        );
        const [removed] = filteredSortedTasks.splice(currentIndex, 1);
        filteredSortedTasks.splice(endIndex, 0, removed);
        const updatedTasks = orderedTasks
          .filter((orderedTask) => orderedTask.status !== task.status)
          .concat(filteredSortedTasks);
        return {
          ...state,
          tasks: updatedTasks,
        };
      }
      // reordering tasks in the same column
      else if (startIndex != undefined && endIndex != undefined) {
        const orderedTasks: Array<ITask> = getOrderedTasks(state.tasks);
        const filteredSortedTasks = orderedTasks.filter(
          (orderedTask) => orderedTask.status === task.status
        );
        const [removed] = filteredSortedTasks.splice(startIndex, 1);
        filteredSortedTasks.splice(endIndex, 0, removed);
        const updatedTasks = orderedTasks
          .filter((orderedTask) => orderedTask.status !== task.status)
          .concat(filteredSortedTasks);
        return {
          ...state,
          tasks: updatedTasks,
        };
      }
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
