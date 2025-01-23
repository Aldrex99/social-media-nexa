import { useEffect, useState } from "react";
import { fetcher } from "../../utils/fetch";
import { DialogTitle } from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import BaseModal from "./BaseModal";
import TextInput from "../inputs/TextInput";
import ToggleInput from "../inputs/ToggleInput";
import Button from "../buttons/Button";
import { ITodo } from "../../pages/Todo";

type TEditTodoModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  selectedTodo: ITodo;
};

export default function EditTodoModal({
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

    try {
      const data = {
        title: selectedTodo.title,
        description: selectedTodo.description,
        imageLink: selectedTodo.imageLink,
        done: selectedTodo.done,
      };

      if (title !== selectedTodo.title) {
        data.title = title;
      }
      if (description !== selectedTodo.description) {
        data.description = description;
      }
      if (imageLink !== selectedTodo.imageLink) {
        data.imageLink = imageLink;
      }
      if (done !== selectedTodo.done) {
        data.done = done;
      }

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
    <BaseModal open={open} setOpen={setOpen}>
      <div>
        <div className="flex flex-col space-y-6">
          <DialogTitle
            as="h3"
            className="text-center text-base font-semibold text-gray-900"
          >
            Modifier la tâche
          </DialogTitle>
          <div className="flex flex-col space-y-4">
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
              <div className="flex items-center space-x-2">
                <TextInput
                  label="Lien de l'image"
                  type="text"
                  placeholder="Lien de l'image"
                  value={imageLink ?? ""}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleDeleteImageLink}
                  className="px-0 py-0 text-red-500 hover:text-red-600"
                  variant="none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setShowImageLinkInput(true)}
                variant="primaryFlat"
                className="m-1 border-none px-0 py-0 hover:bg-transparent hover:text-blue-700"
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                Ajouter une image
              </Button>
            )}
          </div>
        </div>
        {error && (
          <div className="rounded-md bg-red-100 px-4 py-2 text-red-500">
            {error}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        <Button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          variant="primary"
          className="w-full"
        >
          {loading ? (
            "Chargement..."
          ) : (
            <span className="flex">
              <CheckIcon className="mr-2 h-5 w-5" />
              Enregistrer
            </span>
          )}
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          variant="primaryFlat"
          className="w-full"
        >
          Annuler
        </Button>
      </div>
    </BaseModal>
  );
}
