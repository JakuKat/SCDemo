import { Dispatch, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { classNames, getStatusColorScheme, getStatusLabel } from "../functions";
import { useDispatch } from "react-redux";
import { editTask, removeTask, showTaskDetailOverlay } from "../store/tasksSlice";
import { showEdit } from "../store/modalsSlice";
import { Draggable } from "react-beautiful-dnd";

export const TaskGridItem = ({
  taskData,
  taskIndex,
}: {
  taskData: ITask;
  taskIndex: number;
}) => {
  const { name, status, created } = taskData;

  const dispatch: Dispatch<any> = useDispatch();

  const handleTaskDelete = (task: ITask) => {
    dispatch(removeTask(task));
  };

  const handleTaskMove = (task: ITask, newStatus: TaskStatus) => {
    const editedTask = { ...task, status: newStatus as TaskStatus };
    dispatch(editTask({ task: editedTask, endIndex: 0 }));
  };

  const handleEdit = () => {
    dispatch(showEdit(taskData));
  };

  const handleShowOverlay = () => {
    dispatch(showTaskDetailOverlay(taskData));
  };

  const isStatusTodo = status == "todo";
  const isStatusDone = status == "done";

  const buttonBaseClass =
    "px-3 py-1 text-sm leading-6 font-medium w-full flex justify-start";

  const getOptions = () => {
    return (
      <Menu as="div" className=" ml-auto">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "text-gray-600 ",
                    buttonBaseClass
                  )}
                  onClick={() => handleEdit()}
                >
                  Edit
                </button>
              )}
            </Menu.Item>{" "}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "text-gray-600 ",
                    buttonBaseClass
                  )}
                  onClick={() => handleShowOverlay()}
                >
                  Open detail
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() => handleTaskDelete(taskData)}
                className={classNames(buttonBaseClass, "text-red-600 bg-red-50 ")}
              >
                Delete task
              </button>
            </Menu.Item>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <div className="block px-3 py-1 text-xs font-semibold leading-6 text-gray-900">
              Move to:
            </div>
            <Menu.Item>
              <button
                onClick={() =>
                  handleTaskMove(
                    taskData,
                    (isStatusTodo ? "progress" : "todo") as TaskStatus
                  )
                }
                className={classNames(
                  buttonBaseClass,
                  "pl-6",
                  isStatusTodo
                    ? "text-blue-400 bg-blue-50"
                    : "text-gray-600 bg-gray-50"
                )}
              >
                {isStatusTodo ? "In Progress" : "Todo"}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() =>
                  handleTaskMove(
                    taskData,
                    (isStatusDone ? "progress" : "done") as TaskStatus
                  )
                }
                className={classNames(
                  buttonBaseClass,
                  "pl-6",
                  isStatusDone
                    ? "text-blue-400 bg-blue-50"
                    : "text-green-600 bg-green-50"
                )}
              >
                {isStatusDone ? "In Progress" : "Done"}
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  return (
    <Draggable key={taskData.id} draggableId={taskData.id} index={taskIndex}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          onDoubleClick={() => handleShowOverlay()}
          className={classNames(
            "col-span-1 rounded-lg bg-white shadow h-fit mb-4 ",
            draggableSnapshot.isDragging ? "bg-orange-600" : ""
          )}
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <div
            className={classNames(
              getStatusColorScheme(status),
              "flex items-center gap-x-4 border-b border-gray-900/5 px-6 py-4"
            )}
          >
            <div className="text-sm font-medium leading-6 text-gray-900">{name}</div>
            {getOptions()}
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-700">{created.toDateString()}</dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Status</dt>
              <dd className="flex items-start gap-x-2">
                <div
                  className={classNames(
                    getStatusColorScheme(status),
                    "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {getStatusLabel(status)}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </Draggable>
  );
};
