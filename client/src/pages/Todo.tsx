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

export function Todo() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    document.title = "Todo List";
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
      <div className="flex min-h-[100vh] items-center justify-center">
        <div className="relative mx-6 flex w-full flex-col space-y-4 rounded-lg border bg-white px-6 py-12 shadow sm:px-12">
          <h1 className="mb-4 flex justify-center text-2xl font-semibold text-blue-500">
            Todo List
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="absolute right-4 top-8 w-fit rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white"
          >
            Ajouter une tâche
          </button>
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
