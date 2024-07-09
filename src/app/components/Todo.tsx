"use client";
import { deleteTodo, editTodo } from "@/pages/api/api";
import { Task } from "@/pages/api/types";
import React, { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(() => {
    if(isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id)
  }

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
          value={editedTaskTitle}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {isEditing ? (
          <button className="mr-3 text-blue-500" onClick={handleSave}>
            save
          </button>
        ) : (
          <button className="mr-3 text-green-500" onClick={handleEdit}>
            edit
          </button>
        )}
        <button className="text-red-500" onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default Todo;
