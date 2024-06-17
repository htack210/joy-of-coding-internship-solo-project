"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

interface Props {
  task: {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    important: boolean;
    id: string;
  };
}

function TaskItem({ task }: Props) {
  const { title, description, date, isCompleted, id } = task;
  const { theme, deleteTask } = useGlobalState();
  return (
    <TaskItemStyled className="task" theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{isCompleted}</p>
      {/* <p>{important}</p> */}
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button className="completed block mb-4 w-40 rounded-md bg-green-600 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-green-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-slate-400 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-extrabold uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0">
            Completed
          </button>
        ) : (
          <button className="incomplete block mb-4 w-40 rounded-md bg-red-600 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-slate-400 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-extrabold uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0">
            Incomplete
          </button>
        )}
        <button className="edit ml-auto">{edit} Edit</button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {" "}
          Delete
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
`;
export default TaskItem;
