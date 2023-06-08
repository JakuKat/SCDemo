export const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(" ");
};

export const getStatusLabel = (status: TaskStatus) => {
  const labels = { todo: "Todo", progress: "In Progress", done: "Done" };

  return labels[status];
};

export const getStatusColorScheme = (status: TaskStatus) => {
  const statuses = {
    todo: "text-gray-700 bg-gray-50 ring-gray-600/20",
    progress: "text-blue-600 bg-blue-50 ring-blue-500/10",
    done: "text-green-700 bg-green-50 ring-green-600/10",
  };

  return statuses[status];
};
