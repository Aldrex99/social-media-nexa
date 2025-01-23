import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetcher } from "../utils/fetch";
import { useUser } from "../contexts/UserContext";
import { TextInput } from "../components/inputs/TextInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { getUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Se connecter";
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      await fetcher("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      await getUser();

      navigate("/post");
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    }
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="mx-4 flex w-full flex-col space-y-4 rounded-lg border bg-white px-6 py-12 shadow sm:m-0 sm:w-1/2 sm:px-12 lg:w-1/3">
        <h1 className="mb-4 flex justify-center text-2xl font-semibold text-blue-500">
          Se connecter
        </h1>
        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextInput
          label="Mot de passe"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button
          className="rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Connexion
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Link to="/register" className="text-blue-500 hover:to-blue-900">
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
