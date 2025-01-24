import { useState } from "react";
import { fetcher } from "@utils/fetch";
import { DialogTitle } from "@headlessui/react";
import {
  CheckIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import BaseModal from "@components/modals/BaseModal";
import TextInput from "@components/inputs/TextInput";
import ToggleInput from "@components/inputs/ToggleInput";
import Button from "@components/buttons/Button";
import { ITodo } from "@/types/todo";

type TCreateTodoModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
};

export default function CreateTodoModal({
  open,
  setOpen,
  todos,
  setTodos,
}: TCreateTodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showImageLinkInput, setShowImageLinkInput] = useState(false);
  const [imageLink, setImageLink] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const newTodo = await fetcher("/todos", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          imageLink: imageLink ? imageLink : undefined,
          done,
        }),
      });

      setTodos([...todos, newTodo]);

      setTitle("");
      setDescription("");
      setImageLink(null);
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
    setImageLink(null);
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
            Créer une tâche
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
            <span className="flex items-center justify-center">
              <CheckIcon className="mr-2 h-5 w-5" />
              Créer
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
