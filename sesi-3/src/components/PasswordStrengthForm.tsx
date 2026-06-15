import { useForm } from 'react-hook-form';

interface PasswordFormData {
  password: string;
}

function PasswordStrengthForm() {
  const { register, watch } =
    useForm<PasswordFormData>();

  const password =
    watch('password', '');

  const getPasswordStrength = () => {
    if (!password) return '';

    const hasUppercase =
      /[A-Z]/.test(password);

    const hasNumber =
      /\d/.test(password);

    const hasSpecial =
      /[!@#$%^&*]/.test(password);

    if (
      password.length >= 8 &&
      hasUppercase &&
      hasNumber &&
      hasSpecial
    ) {
      return 'Kuat';
    }

    if (
      password.length >= 6 &&
      hasNumber
    ) {
      return 'Sedang';
    }

    return 'Lemah';
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        Password Strength
      </h2>

      <input
        type="password"
        placeholder="Masukkan password"
        {...register('password')}
        className="w-full border p-2 rounded"
      />

      <div className="mt-4">
        <p className="font-medium">
          Kekuatan Password:
        </p>

        <p>
          {getPasswordStrength()}
        </p>
      </div>
    </div>
  );
}

export default PasswordStrengthForm;