import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-md
        mx-auto
        flex
        flex-col
        gap-4
        p-6
        bg-white
        rounded-lg
        shadow
      "
    >
      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            rounded-md
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            rounded-md
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      <button
        type="submit"
        className="
          w-full
          bg-blue-500
          text-white
          py-2
          rounded-md
          hover:bg-blue-600
          transition
        "
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;