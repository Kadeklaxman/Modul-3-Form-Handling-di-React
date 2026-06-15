import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });
  };
  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto bg-white p-6 rounded-xl shadow"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">
      Login
    </h2>

    <div className="mb-4">
      <label className="block mb-2">
        Email
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-2">
        Password
      </label>

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <label className="flex items-center gap-2 mb-4">
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) =>
          setRememberMe(
            e.target.checked
          )
        }
      />

      <span>Ingat Saya</span>
    </label>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg"
    >
      Login
    </button>

    <button
      type="button"
      className="mt-3 text-blue-600 underline w-full"
    >
      Lupa Password?
    </button>

    <div className="mt-6 text-sm">
  <p>Email: {email}</p>
  <p>Password: {password}</p>
  <p>
    Remember:
    {rememberMe ? ' Ya' : ' Tidak'}
  </p>
</div>
  </form>
  );
}

export default LoginForm;
