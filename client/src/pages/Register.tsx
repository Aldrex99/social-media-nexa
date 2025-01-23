import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetcher } from "../utils/fetch";
import { TextInput } from "../components/inputs/TextInput";

export function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Créer un compte";
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await fetcher(
        "/auth/register",
        {
          method: "POST",
          body: JSON.stringify({ email, username, password, confirmPassword }),
        },
        false,
      );

      navigate("/login");
    } catch (error) {
      setError((error as Error).message ?? "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="mx-4 flex w-full flex-col space-y-4 rounded-lg border bg-white px-6 py-12 shadow sm:m-0 sm:w-1/2 sm:px-12 lg:w-1/3">
        <h1 className="mb-4 flex justify-center text-2xl font-semibold text-blue-500">
          Créer un compte
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
          label="Nom d'utilisateur"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
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
        <TextInput
          label="Confirmer le mot de passe"
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        <button
          className="rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Chargement..." : "Créer un compte"}
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Link to="/login" className="text-blue-500 hover:to-blue-900">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
