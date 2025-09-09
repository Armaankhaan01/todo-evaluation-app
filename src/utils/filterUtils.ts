import { Task } from "../types/user";

export const filterTasksByDate = (
  tasks: Task[],
  filter: "all" | "today" | "week" | "custom",
  customRange?: { start: Date; end: Date },
): Task[] => {
  const today = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(today.getDate() - today.getDay());

  return tasks.filter((task) => {
    if (!task.deadline) return false;
    const taskDeadline = new Date(task.deadline);

    switch (filter) {
      case "today":
        return taskDeadline.toDateString() === today.toDateString();
      case "week":
        return taskDeadline >= startOfWeek && taskDeadline <= today;
      case "custom":
        if (customRange) {
          return taskDeadline >= customRange.start && taskDeadline <= customRange.end;
        }
        return false;
      default:
        return true;
    }
  });
};
