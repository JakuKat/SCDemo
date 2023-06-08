import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

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
    editTask: (state, action: PayloadAction<ITask>) => {
      const editedTask: ITask = {
        ...action.payload,
      };

      const filteredTasks = state.tasks.filter(
        (task: ITask) => task.id !== editedTask.id
      );

      return {
        ...state,
        tasks: [...filteredTasks.concat(editedTask)],
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
