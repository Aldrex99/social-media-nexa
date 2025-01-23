import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { TextInput } from "../inputs/TextInput";
import { ToggleInput } from "../inputs/ToggleInput";
import { fetcher } from "../../utils/fetch";
import { ITodo } from "../../pages/Todo";

type TEditTodoModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  selectedTodo: ITodo;
};

export function EditTodoModal({
  open,
  setOpen,
  todos,
  setTodos,
  selectedTodo,
}: TEditTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showImageLinkInput, setShowImageLinkInput] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(selectedTodo.title);
    setDescription(selectedTodo.description);
    if (selectedTodo.imageLink) {
      setShowImageLinkInput(true);
    }
    setImageLink(selectedTodo.imageLink);
    setDone(selectedTodo.done);
  }, [selectedTodo]);

  const handleDeleteImageLink = () => {
    setImageLink("");
    setShowImageLinkInput(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (!title || !description) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    console.log("selectedTodo", selectedTodo.imageLink);

    console.log("imageLink", imageLink);

    try {
      const data: {
        title?: string;
        description?: string;
        imageLink?: string;
        done?: boolean;
      } = {
        title: selectedTodo.title,
        description: selectedTodo.description,
        done: selectedTodo.done,
      };

      if (title !== selectedTodo.title) {
        data.title = title;
      }

      if (description !== selectedTodo.description) {
        data.description = description;
      }

      if (imageLink !== selectedTodo.imageLink && imageLink !== "") {
        data.imageLink = imageLink;
      }

      if (done !== selectedTodo.done) {
        data.done = done;
      }

      console.log("data", data);

      const newTodo = await fetcher(`/todos/${selectedTodo.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo.id ? newTodo : todo,
      );

      setTodos(updatedTodos);

      setTitle("");
      setDescription("");
      setImageLink("");
      setDone(false);
      setOpen(false);
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDescription("");
    setTitle("");
    setImageLink("");
    setDone(false);
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
                  Modifier la tâche
                </DialogTitle>
                <div className="mt-2 space-y-3">
                  <TextInput
                    label="Titre"
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextInput
                    label="Description"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="ml-1 flex items-center gap-2 text-gray-900">
                    <ToggleInput
                      checked={done}
                      setChecked={setDone}
                      label="Statut tâche"
                    />
                    <span className="text-sm">Tâche complétée</span>
                  </div>
                  {showImageLinkInput ? (
                    <div className="flex space-x-2">
                      <TextInput
                        label="Lien de l'image"
                        type="text"
                        placeholder="Lien de l'image"
                        value={imageLink ?? ""}
                        onChange={(e) => setImageLink(e.target.value)}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600"
                        onClick={handleDeleteImageLink}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="ml-1 flex items-center text-blue-500 hover:text-blue-600"
                      onClick={() => setShowImageLinkInput(true)}
                    >
                      <PlusCircleIcon className="mr-2 h-5 w-5" />
                      Ajouter une image
                    </button>
                  )}
                </div>
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
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  "Chargement..."
                ) : (
                  <span className="flex">
                    <CheckIcon className="mr-2 h-5 w-5" />
                    Enregistrer
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
