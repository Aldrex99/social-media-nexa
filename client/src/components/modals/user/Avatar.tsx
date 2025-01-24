import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import BaseModal from "@components/modals/BaseModal";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Button from "@/components/buttons/Button";
import { DialogTitle } from "@headlessui/react";
import { fetcher } from "@/utils/fetch";

type TAvatarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Avatar({ open, setOpen }: TAvatarProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { getUser } = useUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Veuillez sélectionner un fichier");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await fetcher(`/user/avatar`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      setFileUrl(response.link);
      getUser();
      setUploadStatus("Photo de profil mise à jour");
      setOpen(false);
    } catch (error) {
      setUploadStatus((error as Error).message ?? "Une erreur s'est produite");
    }
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
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100"
              >
                {selectedFile ? (
                  <p className="flex flex-col text-center text-lg text-gray-500">
                    Mettre comme photo de profil :{" "}
                    <span className="font-semibold">{selectedFile?.name}</span>
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <CloudArrowUpIcon className="h-8 w-8 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Cliquez pour télécharger
                      </span>{" "}
                      ou glisser-déposer
                    </p>
                    <p className="text-xs text-gray-500">
                      Accepte les fichiers de type image
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {uploadStatus && <p>{uploadStatus}</p>}
            {fileUrl && (
              <img
                src={fileUrl}
                alt="Photo de profil de votre compte"
                className="size-36 rounded-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button type="button" onClick={handleUpload} className="w-full">
          Mettre à jour
        </Button>
        <Button
          type="button"
          onClick={() => setOpen(false)}
          variant="primaryFlat"
          className="w-full"
        >
          Annuler
        </Button>
      </div>
    </BaseModal>
  );
}
