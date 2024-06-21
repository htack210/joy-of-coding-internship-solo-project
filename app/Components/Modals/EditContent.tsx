"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function EditContent({
  task,
  closeModalEdit,
}: {
  task: any;
  closeModalEdit: () => void;
}) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [date, setDate] = useState(task.date || "");
  const [completed, setCompleted] = useState(task.isCompleted || false);
  const [important, setImportant] = useState(task.important || false);
  const { allTasks } = useGlobalState();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDate(task.date || "");
      setCompleted(task.isCompleted || false);
      setImportant(task.important || false);
    }
  }, [task]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      date,
      isCompleted: completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", updatedTask);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Task updated successfully!");
        closeModalEdit();
        allTasks();
      }
    } catch (error) {
      toast.error("Something went wrong. Your toast is burnt!\n" + error);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form bg-neutral-700 rounded-2xl border-2 border-gray-600 p-4 w-96"
    >
      <h1>Edit Task</h1>
      {/* Title */}
      <div className="mb-4 w-full">
        <label htmlFor="title">Title</label>
        <input
          className="w-full block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm text-black focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="Your title here"
        />
      </div>

      {/* Description */}
      <div className="mb-4 w-full">
        <label htmlFor="description">Description</label>
        <textarea
          className="w-full block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm text-black focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          id="description"
          value={description}
          onChange={handleChange("description")}
          name="description"
          rows={4}
          placeholder="Your task description here."
        ></textarea>
      </div>

      {/* Date */}
      <div className="mb-4 w-full">
        <label htmlFor="date">Date</label>
        <input
          className="w-40 block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm text-black focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
          placeholder="Enter a date here."
        />
      </div>

      {/* Completed */}
      <div className="flex items-center mb-4">
        <label
          htmlFor="completed"
          className="ms-1 mr-2 text-base font-medium text-white dark:text-gray-300 hover:cursor-pointer"
        >
          Toggle Completed
        </label>
        <input
          className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 dark:focus:ring-blue-500 dark:ring-offset-gray-700 focus:ring-1 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
          type="checkbox"
          id="completed"
          checked={completed}
          name="completed"
          onChange={handleChange("completed")}
        />
      </div>

      {/* Important */}
      <div className="flex items-center mb-4">
        <label
          htmlFor="important"
          className="ms-1 mr-2 text-base font-medium text-white dark:text-gray-300 hover:cursor-pointer"
        >
          Important
        </label>
        <input
          className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 dark:focus:ring-blue-500 dark:ring-offset-gray-700 focus:ring-1 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
          type="checkbox"
          id="important"
          checked={important}
          name="important"
          onChange={handleChange("important")}
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Task
        </button>
      </div>
    </form>
  );
}

export default EditContent;
