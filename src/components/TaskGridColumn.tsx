import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TaskGridItem } from "./TaskGridItem";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";
import { classNames } from "../functions";
import _ from "lodash";
import { Droppable } from "react-beautiful-dnd";
import { ColumnBody } from "./TaskGrid";

// filter types
type FilterValue = "newest" | "oldest" | "alpha" | "random";
type FilterIterate = "created" | "name";
type FilterOrder = "asc" | "desc";

export const TaskGridColumn = ({ column }: { column: ColumnBody }) => {
  const { status, tasks, title } = column;

  const filterOptions: Array<{
    label: string;
    value: FilterValue;
    iterate: FilterIterate;
    order: FilterOrder;
  }> = [
    {
      label: "Newest to oldest",
      value: "newest",
      iterate: "created",
      order: "desc",
    },
    {
      label: "Oldest to newest",
      value: "oldest",
      iterate: "created",
      order: "asc",
    },
    { label: "Alphabetically", value: "alpha", iterate: "name", order: "asc" },
  ];

  const [selectedFilter, setSelectedFilter] = useState<
    | {
        value: FilterValue;
        iterate: FilterIterate;
        order: FilterOrder;
      }
    | undefined
  >(undefined);

  const getColorScheme = {
    todo: "text-gray-600 bg-gray-50",
    progress: "text-blue-400 bg-blue-50",
    done: "text-green-600 bg-green-50",
  };

  const getTasks = () => {
    return (
      <>
        {(selectedFilter
          ? _.orderBy(tasks, selectedFilter.iterate, selectedFilter.order)
          : tasks
        ).map((task, index) => (
          <TaskGridItem key={task.id} taskData={task} taskIndex={index} />
        ))}
      </>
    );
  };

  return (
    <div className="mt-2 lg:mt-4 relative border-solid border-2 border-gray-100 p-4 h-full rounded-lg">
      <div
        className={classNames(
          "w-full lg:max-w-md transform rounded-2xl p-6 text-left shadow-md transition-all flex justify-between mb-4 ",
          getColorScheme[status]
        )}
      >
        <div>
          <span className="px-2 py-3 font-medium ">
            {title} tasks: {tasks.length}
          </span>
        </div>
        <Menu as="div" className=" inline-block text-left">
          <Menu.Button className="group inline-flex text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
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
            <Menu.Items className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={(e) =>
                          setSelectedFilter(
                            filterOptions[
                              filterOptions.findIndex((o) => o.value == option.value)
                            ]
                          )
                        }
                        className={classNames(
                          selectedFilter && option.value == selectedFilter.value
                            ? "font-medium text-gray-900"
                            : "text-gray-500",
                          active ? "bg-gray-100" : "",
                          "px-4 py-2 text-sm w-full flex justify-start"
                        )}
                      >
                        {option.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <>
            <div
              className="flex flex-1 flex-col h-full"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {getTasks()}
            </div>
            {droppableProvided.placeholder}
          </>
        )}
      </Droppable>
    </div>
  );
};
