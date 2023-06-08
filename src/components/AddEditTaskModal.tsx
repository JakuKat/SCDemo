import { Dispatch, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addTask, editTask } from "../store/tasksSlice";
import moment from "moment";
import { hide } from "../store/modalsSlice";
import { RootState } from "../store";
import { classNames } from "../functions";

type initialValuesProps = { name: string; description: string };

export const AddEditTaskModal = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const modalReducer = useSelector((state: RootState) => state.modalReducer);

  const editedTask = modalReducer.editedTask;

  const handleClose = () => {
    dispatch(hide());
  };

  const handleCreate = (task: ITask) => {
    dispatch(addTask(task));
    handleClose();
  };
  const handleEdit = (task: ITask) => {
    dispatch(editTask(task));
    handleClose();
  };

  return (
    <Transition.Root show={modalReducer.isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="text-start">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Create task
                  </Dialog.Title>
                  <div className="mt-4">
                    <Formik
                      initialValues={
                        {
                          name: modalReducer.isEditing ? editedTask?.name : "",
                          description: modalReducer.isEditing
                            ? editedTask?.description
                            : "",
                        } as initialValuesProps
                      }
                      validationSchema={Yup.object({
                        name: Yup.string()
                          .max(32, "Input too long")
                          .trim()
                          .required("Required"),
                        description: Yup.string()
                          .max(128, "Input too long")
                          .trim()
                          .required("Required"),
                      })}
                      validateOnChange
                      onSubmit={(values: initialValuesProps) => {
                        if (modalReducer.isEditing) {
                          handleEdit({
                            ...modalReducer.editedTask,
                            name: values.name,
                            description: values.description,
                          } as ITask);
                        } else {
                          handleCreate({
                            id: nanoid(),
                            name: values.name,
                            description: values.description,
                            status: "todo",
                            created: moment().toDate(),
                          });
                        }
                      }}
                    >
                      {({ values }) => (
                        <Form>
                          <div className="grid gap-y-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Name
                              </label>
                              <Field
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <div className="flex gap-2 mt-2 justify-start align-middle">
                                <div
                                  className={classNames(
                                    "text-xs",
                                    values.name.length > 32
                                      ? "text-red-600"
                                      : "text-gray-400"
                                  )}
                                >
                                  {values.name.length}/32
                                </div>
                                <ErrorMessage
                                  name="name"
                                  component="span"
                                  className="text-xs text-red-600"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <Field
                                type="text"
                                as="textarea"
                                rows="5"
                                name="description"
                                id="description"
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <div className="flex gap-2 mt-2 justify-start align-middle">
                                <div
                                  className={classNames(
                                    "text-xs",
                                    values.description.length > 128
                                      ? "text-red-600"
                                      : "text-gray-400"
                                  )}
                                >
                                  {values.description.length}/128
                                </div>
                                <ErrorMessage
                                  name="description"
                                  component="span"
                                  className="text-xs text-red-600"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                              {modalReducer.isEditing ? "Edit" : "Add"}
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
