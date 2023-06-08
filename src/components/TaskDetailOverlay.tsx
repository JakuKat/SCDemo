import { Dispatch, Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { classNames, getStatusColorScheme, getStatusLabel } from "../functions";
import { useDispatch, useSelector } from "react-redux";
import { hideTaskDetailOverlay } from "../store/tasksSlice";
import { RootState } from "../store";

export const TaskDetailOverlay = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const taskReducer = useSelector((state: RootState) => state.tasksReducer);

  const today = new Date();

  const handleClose = () => {
    dispatch(hideTaskDetailOverlay());
  };

  const getTaskContent = (task: ITask) => {
    const { created, description, name, status }: ITask = task;
    return (
      <>
        <div
          className={classNames(
            getStatusColorScheme(status),
            "flex items-center gap-x-4 border-b border-gray-900/5 px-6 py-4"
          )}
        >
          <div className="text-sm font-medium leading-6 text-gray-900">{name}</div>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Created</dt>
            <dd className="text-gray-700">{created.toDateString()}</dd>
          </div>
          {status === "done" && (
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Closed</dt>
              <dd className="text-gray-700">{today.toDateString()}</dd>
            </div>
          )}
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Description</dt>
            <dd className="text-gray-700 line-clamp-5 max-w-sm">{description}</dd>
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
      </>
    );
  };

  return (
    <Transition.Root show={taskReducer.isDetailOverlayVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-1500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-1500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={handleClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        Task detail
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1">
                      {taskReducer.taskDetail &&
                        getTaskContent(taskReducer.taskDetail)}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
