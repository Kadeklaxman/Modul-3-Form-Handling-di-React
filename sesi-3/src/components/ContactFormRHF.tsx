import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactFormRHF() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Pesan berhasil dikirim!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
  >
    <h2 className="text-2xl font-bold text-center">
      Contact Form
    </h2>

    <div>
      <label className="block mb-1 font-medium">
        Name
      </label>
      <input
        {...register('name', { required: 'Name is required' })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
    </div>

    <div>
      <label className="block mb-1 font-medium">
        Email
      </label>
      <input
        {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
    </div>

    <div>
      <label className="block mb-1 font-medium">
        Subject
      </label>
      <input
        {...register('subject', { required: 'Subject is required' })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>}
    </div>

    <div>
      <label className="block mb-1 font-medium">
        Message
      </label>
      <textarea
        {...register('message', { required: 'Message is required' })}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
    </div>
    
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition"
    >
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </form>
  );
}

export default ContactFormRHF;