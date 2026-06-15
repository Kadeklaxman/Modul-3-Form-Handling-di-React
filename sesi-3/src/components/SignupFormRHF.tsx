// src/components/SignupFormRHF.tsx
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupFormRHF() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    console.log('Signup data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Registrasi berhasil!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow-sm'>
            <h2 className='text-2xl font-bold text-gray-900'>Sign up</h2>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
        <input
          {...register('username', {
            required: 'Username wajib diisi',
            minLength: { value: 3, message: 'Username minimal 3 karakter' },
            maxLength: { value: 20, message: 'Username maksimal 20 karakter' },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username hanya boleh huruf, angka, dan underscore',
            },
          })}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.username && <p className='text-sm text-red-600 mt-1'>{errors.username.message}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
        <input
          type='email'
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Format email tidak valid' },
          })}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
        <input
          type='password'
          {...register('password', {
            required: 'Password wajib diisi',
            minLength: { value: 8, message: 'Password minimal 8 karakter' },
            validate: (value) =>
              /[A-Z]/.test(value) || 'Password harus mengandung huruf besar',
          })}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.password && <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Konfirmasi Password</label>
        <input
          type='password'
          {...register('confirmPassword', {
            required: 'Konfirmasi password wajib diisi',
            validate: (value) => value === passwordValue || 'Password tidak cocok',
          })}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.confirmPassword && (
          <p className='text-sm text-red-600 mt-1'>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition'
      >
        {isSubmitting ? 'Mendaftar...' : 'Daftar'}
      </button>
    </form>
  );
}

export default SignupFormRHF;