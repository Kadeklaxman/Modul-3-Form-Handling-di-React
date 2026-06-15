// src/components/LoginFormRHF.tsx
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

function LoginFormRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log('Login attempt:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Selamat datang, ${data.email}!`);
    reset();
  };

  const emailValue = watch('email');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow-sm'
    >
      <h2 className='text-2xl font-bold text-gray-900'>Login</h2>

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
          Email
        </label>
        <input
          id='email'
          type='email'
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Format email tidak valid',
            },
          })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
          Password
        </label>
        <input
          id='password'
          type='password'
          {...register('password', {
            required: 'Password wajib diisi',
            minLength: { value: 8, message: 'Password minimal 8 karakter' },
          })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.password && <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>}
      </div>

      <label className='flex items-center gap-2 cursor-pointer'>
        <input type='checkbox' {...register('remember')} />
        <span className='text-sm text-gray-700'>Ingat saya</span>
      </label>

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition'
      >
        {isSubmitting ? 'Memproses...' : 'Login'}
      </button>

      <p className='text-sm text-gray-500 text-center'>
        Email yang sedang diketik: <strong>{emailValue}</strong>
      </p>
    </form>
  );
}

export default LoginFormRHF;