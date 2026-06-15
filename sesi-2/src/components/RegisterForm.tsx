import { useState, FormEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | '';
  hobbies: string[];
  bio: string;
  agreeToTerms: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const availableHobbies = [
  'Membaca',
  'Coding',
  'Gaming',
  'Olahraga',
  'Musik',
];

const initialData: FormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  phone: '',
  gender: '',
  hobbies: [],
  bio: '',
  agreeToTerms: false,
};

function RegisterForm() {
  const [data, setData] =
    useState<FormData>(initialData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [touched, setTouched] =
    useState<
      Partial<
        Record<keyof FormData, boolean>
      >
    >({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const validate = (
    values: FormData
  ): FormErrors => {
    const newErrors: FormErrors = {};

    // Nama
    if (!values.fullName.trim()) {
      newErrors.fullName =
        'Nama lengkap wajib diisi';
    }

    // Email
    if (!values.email.trim()) {
      newErrors.email =
        'Email wajib diisi';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        values.email
      )
    ) {
      newErrors.email =
        'Format email tidak valid';
    }

    // Password
    if (!values.password) {
      newErrors.password =
        'Password wajib diisi';
    } else if (
      values.password.length < 8
    ) {
      newErrors.password =
        'Password minimal 8 karakter';
    }

    // Confirm Password
    if (
      values.confirmPassword !==
      values.password
    ) {
      newErrors.confirmPassword =
        'Konfirmasi password tidak cocok';
    }

    // Tanggal Lahir
    if (!values.birthDate) {
      newErrors.birthDate =
        'Tanggal lahir wajib diisi';
    } else {
      const today = new Date();
      const birthDate = new Date(
        values.birthDate
      );

      let age =
        today.getFullYear() -
        birthDate.getFullYear();

      const monthDiff =
        today.getMonth() -
        birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 &&
          today.getDate() <
            birthDate.getDate())
      ) {
        age--;
      }

      if (age < 17) {
        newErrors.birthDate =
          'Usia minimal 17 tahun';
      }
    }

    // Nomor Telepon
    const phoneRegex =
      /^(08|\+62)[0-9]{8,13}$/;

    if (!values.phone.trim()) {
      newErrors.phone =
        'Nomor telepon wajib diisi';
    } else if (
      !phoneRegex.test(values.phone)
    ) {
      newErrors.phone =
        'Nomor telepon tidak valid';
    }

    // Gender
    if (!values.gender) {
      newErrors.gender =
        'Pilih jenis kelamin';
    }

    // Hobi
    if (values.hobbies.length === 0) {
      newErrors.hobbies =
        'Pilih minimal satu hobi';
    }

    // Bio
    if (
      values.bio &&
      values.bio.length < 20
    ) {
      newErrors.bio =
        'Bio minimal 20 karakter';
    }

    // Terms
    if (!values.agreeToTerms) {
      newErrors.agreeToTerms =
        'Anda harus menyetujui syarat dan ketentuan';
    }

    return newErrors;
  };

  const handleChange = <
    K extends keyof FormData
  >(
    field: K,
    value: FormData[K]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (
    field: keyof FormData
  ) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors(validate(data));
  };

  const handleHobbyToggle = (
    hobby: string
  ) => {
    setData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(
        hobby
      )
        ? prev.hobbies.filter(
            (h) => h !== hobby
          )
        : [...prev.hobbies, hobby],
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validationErrors =
      validate(data);

    setErrors(validationErrors);

    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      birthDate: true,
      phone: true,
      gender: true,
      hobbies: true,
      bio: true,
      agreeToTerms: true,
    });

    if (
      Object.keys(validationErrors)
        .length === 0
    ) {
      alert('Registrasi berhasil');

      console.log(data);

      setData(initialData);
      setTouched({});
    }
  };

  const showError = (
    field: keyof FormData
  ) =>
    Boolean(
      touched[field] &&
        errors[field]
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">
        Register Form
      </h2>

      <input
        type="text"
        placeholder="Nama Lengkap"
        value={data.fullName}
        onChange={(e) =>
          handleChange(
            'fullName',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur('fullName')
        }
        className="w-full border p-2 rounded"
      />

      {showError('fullName') && (
        <p className="text-red-500 text-sm">
          {errors.fullName}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) =>
          handleChange(
            'email',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur('email')
        }
        className="w-full border p-2 rounded"
      />

      {showError('email') && (
        <p className="text-red-500 text-sm">
          {errors.email}
        </p>
      )}

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) =>
          handleChange(
            'password',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur('password')
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Konfirmasi Password"
        value={data.confirmPassword}
        onChange={(e) =>
          handleChange(
            'confirmPassword',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur(
            'confirmPassword'
          )
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        value={data.birthDate}
        onChange={(e) =>
          handleChange(
            'birthDate',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur('birthDate')
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="tel"
        placeholder="08123456789"
        value={data.phone}
        onChange={(e) =>
          handleChange(
            'phone',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur('phone')
        }
        className="w-full border p-2 rounded"
      />

      {showError('phone') && (
        <p className="text-red-500 text-sm">
          {errors.phone}
        </p>
      )}

      <textarea
        rows={4}
        placeholder="Bio"
        value={data.bio}
        onChange={(e) =>
          handleChange(
            'bio',
            e.target.value
          )
        }
        onBlur={() =>
          handleBlur('bio')
        }
        className="w-full border p-2 rounded"
      />

      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={data.agreeToTerms}
          onChange={(e) =>
            handleChange(
              'agreeToTerms',
              e.target.checked
            )
          }
        />
        Saya setuju dengan syarat dan ketentuan
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Daftar
      </button>
    </form>
  );
}

export default RegisterForm;