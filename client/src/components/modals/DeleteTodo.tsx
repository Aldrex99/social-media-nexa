import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { fetcher } from "../../utils/fetch";
import { ITodo } from "../../pages/Todo";

type TDeleteTodoModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  selectedTodo: ITodo;
};

export function DeleteTodoModal({
  open,
  setOpen,
  todos,
  setTodos,
  selectedTodo,
}: TDeleteTodoModalProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(selectedTodo.title);
  }, [selectedTodo]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await fetcher(`/todos/${selectedTodo.id}`, {
        method: "DELETE",
      });

      const updatedTodos = todos.filter((todo) => todo.id !== selectedTodo.id);

      setTodos(updatedTodos);

      setTitle("");
      setOpen(false);
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-center text-base font-semibold text-gray-900"
                >
                  Êtes-vous sûr de vouloir supprimer la tâche {title} ?
                </DialogTitle>
                <div className="mt-2 space-y-3"></div>
              </div>
              <div className="mt-3 sm:mt-5">
                {error && (
                  <div className="rounded-md bg-red-100 p-2 text-red-500">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  "Chargement..."
                ) : (
                  <span className="flex">
                    <XMarkIcon className="mr-2 h-5 w-5" />
                    Supprimer
                  </span>
                )}
              </button>
              <button
                type="button"
                className="mt-3 flex w-full justify-center rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                disabled={loading}
                onClick={handleCancel}
              >
                Annuler
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}