// src/components/ContactForm.tsx

import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.subject) {
      newErrors.subject = 'Pilih subjek terlebih dahulu';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(
      (error) => error === ''
    );
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    alert('Pesan berhasil dikirim!');

    console.log(formData);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    setErrors({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-xl
        mx-auto
        bg-white
        p-6
        rounded-xl
        shadow-md
        space-y-4
      "
    >
      <h2 className="text-2xl font-bold text-center">
        Hubungi Kami
      </h2>

      {/* Nama */}
      <div>
        <label className="block mb-1 font-medium">
          Nama
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="block mb-1 font-medium">
          Subjek
        </label>

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        >
          <option value="">
            Pilih Subjek
          </option>

          <option value="support">
            Bantuan
          </option>

          <option value="feedback">
            Feedback
          </option>

          <option value="complaint">
            Keluhan
          </option>

          <option value="other">
            Lainnya
          </option>
        </select>

        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Pesan */}
      <div>
        <label className="block mb-1 font-medium">
          Pesan
        </label>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
          "
        />

        {errors.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="
          w-full
          bg-blue-600
          text-white
          py-2
          rounded-lg
          hover:bg-blue-700
          transition
        "
      >
        Kirim Pesan
      </button>
    </form>
  );
}

export default ContactForm;