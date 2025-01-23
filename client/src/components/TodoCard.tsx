import { useState } from "react";
import { ITodo } from "../pages/Todo";
import { fetcher } from "../utils/fetch";
import {
  PhotoIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type TTodoCardProps = {
  key: string;
  todo: ITodo;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  setShowEditModal: (showEditModal: boolean) => void;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
  setSelectedTodo: (selectedTodo: ITodo) => void;
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function TodoCard({
  key,
  todo,
  todos,
  setTodos,
  setShowEditModal,
  setShowDeleteModal,
  setSelectedTodo,
}: TTodoCardProps) {
  const [error, setError] = useState("");

  const handleEdit = () => {
    setShowEditModal(true);
    setSelectedTodo(todo);
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
    setSelectedTodo(todo);
  };

  const handleDone = async () => {
    try {
      await fetcher(`/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify({ done: !todo.done }),
      });

      const newTodos = todos.map((t) =>
        t.id === todo.id ? { ...t, done: !t.done } : t,
      );

      setTodos(newTodos);
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    }
  };

  return (
    <li
      key={key}
      className="col-span-1 flex flex-col rounded-lg border border-gray-300 text-center shadow-md"
    >
      <div className="flex flex-1 flex-col p-8">
        {todo.imageLink ? (
          <img
            alt=""
            src={todo.imageLink}
            className="mx-auto size-24 shrink-0"
          />
        ) : (
          <PhotoIcon className="mx-auto h-24 w-24 text-gray-300" />
        )}
        <h3 className="mt-6 text-sm font-medium text-gray-900">{todo.title}</h3>
        <dl className="mt-1 flex grow flex-col justify-between">
          <dt className="sr-only">Description</dt>
          <dd className="break-words text-sm text-gray-500">
            {todo.description}
          </dd>
          <dt className="sr-only">Status</dt>
          <dd className="mt-3 flex items-center justify-center gap-1">
            <span
              className={classNames(
                todo.done
                  ? "bg-green-50 text-green-700 ring-green-600/20"
                  : "bg-orange-50 text-orange-700 ring-orange-600/20",
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
              )}
            >
              {todo.done ? "Completed" : "In progress"}
            </span>
            <button
              type="button"
              className="font-semibold"
              onClick={handleDone}
              title={
                todo.done
                  ? "Marquer comme non terminé"
                  : "Marquer comme terminé"
              }
            >
              {todo.done ? (
                <XCircleIcon className="h-4 w-4 text-orange-500" />
              ) : (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              )}
            </button>
          </dd>
          <dt className="sr-only">Erreur</dt>
          <dd className="mt-3 text-sm text-red-500">{error}</dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex">
          <div className="flex w-0 flex-1">
            <button
              type="button"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-1 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-blue-500 hover:text-blue-700"
              onClick={handleEdit}
            >
              <PencilIcon className="h-4 w-4" />
              <span>Modifier</span>
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-1 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-red-500 hover:text-red-700"
              onClick={handleDelete}
            >
              <TrashIcon className="h-4 w-4" />
              <span>Supprimer</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}