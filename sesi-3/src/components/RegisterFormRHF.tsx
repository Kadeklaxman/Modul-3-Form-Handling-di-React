import { useForm } from "react-hook-form";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterFormRHF() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Register Data:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Registrasi berhasil!");

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Register Form
      </h2>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium mb-1">Username</label>

        <input
          type="text"
          {...register("username", {
            required: "Username wajib diisi",
            minLength: {
              value: 3,
              message: "Username minimal 3 karakter",
            },
            maxLength: {
              value: 20,
              message: "Username maksimal 20 karakter",
            },
          })}
          className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
            errors.username
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>

        <input
          type="email"
          {...register("email", {
            required: "Email wajib diisi",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format email tidak valid",
            },
          })}
          className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>

        <input
          type="password"
          {...register("password", {
            required: "Password wajib diisi",
            minLength: {
              value: 8,
              message: "Password minimal 8 karakter",
            },
          })}
          className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Konfirmasi Password
        </label>

        <input
          type="password"
          {...register("confirmPassword", {
            required: "Konfirmasi password wajib diisi",
            validate: (value) =>
              value === passwordValue || "Password tidak cocok",
          })}
          className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
      >
        {isSubmitting ? "Mendaftar..." : "Daftar"}
      </button>
    </form>
  );
}

export default RegisterFormRHF;
