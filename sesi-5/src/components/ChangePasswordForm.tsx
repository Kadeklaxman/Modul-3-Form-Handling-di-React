import { useState, FormEvent, ChangeEvent } from "react";

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePasswordForm() {
  const [formData, setFormData] =
    useState<PasswordFormData>({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordFormData, string>>
  >({});

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: Partial<
      Record<keyof PasswordFormData, string>
    > = {};

    // Password lama
    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword =
        "Password lama wajib diisi";
    }

    // Password baru
    if (!formData.newPassword.trim()) {
      newErrors.newPassword =
        "Password baru wajib diisi";
    } else if (
      formData.newPassword.length < 8
    ) {
      newErrors.newPassword =
        "Password minimal 8 karakter";
    } else if (
      formData.newPassword ===
      formData.oldPassword
    ) {
      newErrors.newPassword =
        "Password baru harus berbeda dari password lama";
    }

    // Konfirmasi password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Konfirmasi password wajib diisi";
    } else if (
      formData.confirmPassword !==
      formData.newPassword
    ) {
      newErrors.confirmPassword =
        "Konfirmasi password tidak cocok";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccessMessage("");

    if (!validate()) return;

    console.log("Password berhasil diubah");

    setSuccessMessage(
      "Password berhasil diubah!"
    );

    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">
          Ganti Password
        </h2>

        {/* Password Lama */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Password Lama
          </label>

          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword}
            </p>
          )}
        </div>

        {/* Password Baru */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Password Baru
          </label>

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Konfirmasi Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Konfirmasi Password Baru
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Ubah Password
        </button>

        {successMessage && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default ChangePasswordForm;