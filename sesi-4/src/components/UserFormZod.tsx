// src/components/UserFormZod.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/userSchemas.ts';
import type { UserFormData } from '../schemas/userSchemas.ts';

function UserFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      website: '',
    },
  });

  const onSubmit = async (data: UserFormData) => {
    console.log('Data valid:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Data berhasil dikirim!');
    reset();
  };

  const fieldClass = (fieldName: keyof UserFormData): string =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
      errors[fieldName]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-blue-500'
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-xl mx-auto p-6 space-y-4 bg-white rounded-lg shadow-sm'
    >
      <h2 className='text-2xl font-bold text-gray-900'>Form dengan Zod</h2>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Nama Lengkap</label>
        <input {...register('fullName')} className={fieldClass('fullName')} />
        {errors.fullName && (
          <p className='text-sm text-red-600 mt-1'>{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
        <input type='email' {...register('email')} className={fieldClass('email')} />
        {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
          <input type='password' {...register('password')} className={fieldClass('password')} />
          {errors.password && (
            <p className='text-sm text-red-600 mt-1'>{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Konfirmasi Password</label>
          <input
            type='password'
            {...register('confirmPassword')}
            className={fieldClass('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-sm text-red-600 mt-1'>{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Umur</label>
        <input
          type='number'
          {...register('age', { valueAsNumber: true })}
          className={fieldClass('age')}
        />
        {errors.age && <p className='text-sm text-red-600 mt-1'>{errors.age.message}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Website (opsional)</label>
        <input
          type='url'
          {...register('website')}
          className={fieldClass('website')}
          placeholder='https://example.com'
        />
        {errors.website && <p className='text-sm text-red-600 mt-1'>{errors.website.message}</p>}
      </div>

      <label className='flex items-center gap-2 cursor-pointer'>
        <input type='checkbox' {...register('agreeToTerms')} />
        <span className='text-sm text-gray-700'>Saya menyetujui syarat dan ketentuan</span>
      </label>
      {errors.agreeToTerms && (
        <p className='text-sm text-red-600 mt-1'>{errors.agreeToTerms.message}</p>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition'
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim'}
      </button>
    </form>
  );
}

export default UserFormZod;