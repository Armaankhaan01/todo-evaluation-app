import type { Task } from "../../types/user";
import { filterTasksByDate } from "../filterUtils";
import { describe, it, expect } from "vitest";

describe("filterTasksByDate - simple case", () => {
  const today = new Date();

  const sampleTasks: Task[] = [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Simple Task Today",
      done: false,
      pinned: false,
      color: "#000000",
      date: today,
      deadline: today,
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Task Without Deadline",
      done: false,
      pinned: false,
      color: "#000000",
      date: today,
    },
  ];

  it("returns only tasks with deadlines when using 'all' filter", () => {
    const result = filterTasksByDate(sampleTasks, "all");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Simple Task Today");
  });

  it("returns the task when filtering by 'today'", () => {
    const result = filterTasksByDate(sampleTasks, "today");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Simple Task Today");
  });
});
