import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  registerSchema,
} from '../schemas/registerSchema';

import type {
  RegisterFormData,
} from '../schemas/registerSchema';

const availableHobbies = [
  'Membaca',
  'Coding',
  'Gaming',
  'Olahraga',
  'Musik',
];

function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),

    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      phone: '',
      gender: 'male',
      hobbies: [],
      bio: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    console.log(data);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    alert('Registrasi berhasil');

    reset();
  };

  const fieldClass = (
    field:
      keyof RegisterFormData
  ) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-blue-500'
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Register Form
      </h2>

      {/* FULL NAME */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Nama Lengkap
        </label>

        <input
          {...register('fullName')}
          className={fieldClass(
            'fullName'
          )}
        />

        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.fullName
                .message
            }
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Email
        </label>

        <input
          type="email"
          {...register('email')}
          className={fieldClass(
            'email'
          )}
        />

        {errors.email && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.email
                .message
            }
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <input
            type="password"
            {...register(
              'password'
            )}
            className={fieldClass(
              'password'
            )}
          />

          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Konfirmasi Password
          </label>

          <input
            type="password"
            {...register(
              'confirmPassword'
            )}
            className={fieldClass(
              'confirmPassword'
            )}
          />

          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {
                errors
                  .confirmPassword
                  .message
              }
            </p>
          )}
        </div>
      </div>

      {/* BIRTH DATE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tanggal Lahir
        </label>

        <input
          type="date"
          {...register(
            'birthDate'
          )}
          className={fieldClass(
            'birthDate'
          )}
        />

        {errors.birthDate && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.birthDate
                .message
            }
          </p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Nomor Telepon
        </label>

        <input
          type="tel"
          {...register('phone')}
          className={fieldClass(
            'phone'
          )}
        />

        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.phone
                .message
            }
          </p>
        )}
      </div>

      {/* GENDER */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Jenis Kelamin
        </label>

        <select
          {...register(
            'gender'
          )}
          className={fieldClass(
            'gender'
          )}
        >
          <option value="male">
            Laki-laki
          </option>

          <option value="female">
            Perempuan
          </option>

          <option value="other">
            Lainnya
          </option>
        </select>

        {errors.gender && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.gender
                .message
            }
          </p>
        )}
      </div>

      {/* HOBBIES */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Hobi
        </label>

        <div className="flex flex-wrap gap-4">
          {availableHobbies.map(
            (hobby) => (
              <label
                key={hobby}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  value={hobby}
                  {...register(
                    'hobbies'
                  )}
                />

                {hobby}
              </label>
            )
          )}
        </div>

        {errors.hobbies && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.hobbies
                .message
            }
          </p>
        )}
      </div>

      {/* BIO */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Bio
        </label>

        <textarea
          rows={4}
          {...register('bio')}
          className={fieldClass(
            'bio'
          )}
        />

        {errors.bio && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors.bio
                .message
            }
          </p>
        )}
      </div>

      {/* TERMS */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register(
              'agreeToTerms'
            )}
          />

          Saya menyetujui syarat dan ketentuan
        </label>

        {errors.agreeToTerms && (
          <p className="text-red-600 text-sm mt-1">
            {
              errors
                .agreeToTerms
                .message
            }
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg transition"
      >
        {isSubmitting
          ? 'Mengirim...'
          : 'Daftar'}
      </button>
    </form>
  );
}

export default RegisterForm;