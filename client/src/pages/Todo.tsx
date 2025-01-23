import { useEffect, useState } from "react";
import { fetcher } from "../utils/fetch";
import { CreateTodoModal } from "../components/modals/CreateTodo";
import { EditTodoModal } from "../components/modals/EditTodo";
import { DeleteTodoModal } from "../components/modals/DeleteTodo";
import { TodoCard } from "../components/TodoCard";

export interface ITodo {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Todo() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    document.title = "Social Nexa | Todo List";
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const newTodoList = await fetcher("/todos");
        setTodos(newTodoList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      {showCreateModal && (
        <CreateTodoModal
          open={showCreateModal}
          setOpen={setShowCreateModal}
          todos={todos}
          setTodos={setTodos}
        />
      )}
      {showEditModal && (
        <EditTodoModal
          open={showEditModal}
          setOpen={setShowEditModal}
          todos={todos}
          setTodos={setTodos}
          selectedTodo={selectedTodo as ITodo}
        />
      )}
      {showDeleteModal && (
        <DeleteTodoModal
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          todos={todos}
          setTodos={setTodos}
          selectedTodo={selectedTodo as ITodo}
        />
      )}
      <div className="flex min-h-screen flex-col">
        <div className="flex p-2">
          <h1 className="flex-1 py-2 pl-2 text-2xl font-semibold text-blue-500">
            Todo List
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-fit rounded-lg bg-blue-500 px-3 py-1 text-white outline-none focus-visible:outline-none focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Ajouter une tâche
          </button>
        </div>
        <div className="flex w-full flex-col space-y-4 px-3 sm:px-6">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
                setShowEditModal={setShowEditModal}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedTodo={setSelectedTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
