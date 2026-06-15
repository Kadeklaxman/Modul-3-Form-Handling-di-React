import { useForm } from 'react-hook-form';

interface CreatePostFormData {
  title: string;
  category: string;
  content: string;
  published: boolean;
}

function CreatePostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreatePostFormData>({
    defaultValues: {
      title: '',
      category: '',
      content: '',
      published: false,
    },
  });

  const onSubmit = async (
    data: CreatePostFormData
  ) => {
    console.log('Post Data:', data);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    alert('Post berhasil dibuat!');

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Create Post
      </h2>

      {/* Judul */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Judul
        </label>

        <input
          id="title"
          type="text"
          placeholder="Masukkan judul post"
          {...register('title', {
            required: 'Judul wajib diisi',
            minLength: {
              value: 5,
              message: 'Judul minimal 5 karakter',
            },
          })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.title
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Kategori */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Kategori
        </label>

        <select
          id="category"
          {...register('category', {
            required: 'Kategori wajib dipilih',
          })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            errors.category
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        >
          <option value="">
            Pilih Kategori
          </option>

          <option value="react">
            React
          </option>

          <option value="typescript">
            TypeScript
          </option>

          <option value="javascript">
            JavaScript
          </option>

          <option value="tailwind">
            Tailwind CSS
          </option>
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Konten */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Konten
        </label>

        <textarea
          id="content"
          rows={6}
          placeholder="Tulis isi artikel..."
          {...register('content', {
            required: 'Konten wajib diisi',
            minLength: {
              value: 20,
              message: 'Konten minimal 20 karakter',
            },
          })}
          className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 transition ${
            errors.content
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />

        {errors.content && (
          <p className="text-red-500 text-sm mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Published */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('published')}
            className="h-4 w-4"
          />

          <span className="text-gray-700">
            Publish sekarang
          </span>
        </label>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition"
      >
        {isSubmitting
          ? 'Menyimpan...'
          : 'Buat Post'}
      </button>
    </form>
  );
}

export default CreatePostForm;