import { nanoid } from "nanoid";
import { TaskGridColumn } from "./TaskGridColumn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Dispatch, useState } from "react";
import _ from "lodash";
import { editTask } from "../store/tasksSlice";

export type ColumnBody = {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: Array<ITask>;
};
type ColumnProps = {
  [key: string]: ColumnBody;
};

type InitialDataProps = {
  columns: ColumnProps;
  columnOrder: Array<string>;
};

export const TaskGrid = () => {
  const tasks = useSelector((state: RootState) => state.tasksReducer.tasks);
  const dispatch: Dispatch<any> = useDispatch();

  const initialData: InitialDataProps = {
    columns: {
      todo: {
        id: "todo",
        title: "Todo",
        status: "todo",
        tasks: tasks.filter((task: ITask) => task.status == "todo"),
      },
      progress: {
        id: "progress",
        title: "In progress",
        status: "progress",
        tasks: tasks.filter((task: ITask) => task.status == "progress"),
      },
      done: {
        id: "done",
        title: "Done",
        status: "done",
        tasks: tasks.filter((task: ITask) => task.status == "done"),
      },
    },
    columnOrder: ["todo", "progress", "done"],
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = initialData.columns[source.droppableId];
    const destinationCol = initialData.columns[destination.droppableId];
    const updatedTask = tasks.find((task: ITask) => task.id == draggableId) as ITask;

    // If the user drops within the same column but in a different position
    if (sourceCol.id === destinationCol.id) {
      dispatch(
        editTask({
          task: updatedTask,
          startIndex: source.index,
          endIndex: destination.index,
        })
      );
      return;
    }

    // if user drags task to different column
    dispatch(
      editTask({
        task: { ...updatedTask, status: destination.droppableId as TaskStatus },
        endIndex: destination.index,
      })
    );
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 items-start min-h-[80vh] ">
        {initialData.columnOrder.map((columnId: string) => (
          <TaskGridColumn key={columnId} column={initialData.columns[columnId]} />
        ))}
      </div>
    </DragDropContext>
  );
};
