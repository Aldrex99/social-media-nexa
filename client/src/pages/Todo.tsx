import { useEffect, useState } from "react";
import { fetcher } from "@utils/fetch";
import CreateTodoModal from "@components/modals/todo/CreateTodo";
import EditTodoModal from "@components/modals/todo/EditTodo";
import DeleteTodoModal from "@components/modals/todo/DeleteTodo";
import TodoCard from "@components/TodoCard";
import { ITodo } from "@/types/todo";
import Button from "@/components/buttons/Button";

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
      <div className="flex flex-col">
        <div className="flex items-center p-2">
          <h1 className="flex-1 py-2 pl-2 text-2xl font-semibold text-blue-500">
            Votre liste de tâches
          </h1>
          <Button type="button" onClick={() => setShowCreateModal(true)}>
            Nouvelle tâche
          </Button>
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
