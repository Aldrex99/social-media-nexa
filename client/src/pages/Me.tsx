import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/buttons/Button";
import Avatar from "@/components/modals/user/Avatar";

export default function Me() {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { user } = useUser();

  return (
    <>
      <Avatar open={showAvatarModal} setOpen={setShowAvatarModal} />
      <div className="flex flex-col">
        <div className="flex items-center p-2">
          <h1 className="flex-1 py-2 pl-2 text-2xl font-semibold text-blue-500">
            Mon profil
          </h1>
          <Button type="button">Modifier</Button>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="none"
              className="rounded-full border"
              defaultPadding={false}
              onClick={() => setShowAvatarModal(true)}
            >
              <img
                src={user?.profilePictureLink}
                alt="Photo de profil de votre compte"
                className="size-36 rounded-full"
              />
              <div className="absolute z-10 flex size-36 items-center justify-center rounded-full bg-black bg-opacity-50 font-semibold text-white opacity-0 hover:opacity-100">
                <p>Modifier</p>
              </div>
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{user?.username}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
