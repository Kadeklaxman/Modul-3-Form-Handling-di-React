import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { postSchema } from '../schemas/postSchema';
import type { PostFormData } from '../schemas/postSchema';

function CreatePostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      category: '',
      content: '',
      tags: [],
      status: 'draft',
    },
  });

  const onSubmit = async (data: PostFormData) => {
    console.log(data);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    alert('Post berhasil dibuat');
    reset();
  };

  const fieldClass = (
    fieldName: keyof PostFormData
  ): string =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
      errors[fieldName]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-blue-500'
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-sm space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Create Post
      </h2>

      {/* TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Judul
        </label>

        <input
          {...register('title')}
          className={fieldClass('title')}
          placeholder="Masukkan judul post"
        />

        {errors.title && (
          <p className="text-sm text-red-600 mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kategori
        </label>

        <select
          {...register('category')}
          className={fieldClass('category')}
        >
          <option value="">Pilih kategori</option>
          <option value="programming">
            Programming
          </option>
          <option value="design">
            Design
          </option>
          <option value="technology">
            Technology
          </option>
        </select>

        {errors.category && (
          <p className="text-sm text-red-600 mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Konten
        </label>

        <textarea
          rows={5}
          {...register('content')}
          className={fieldClass('content')}
          placeholder="Tulis isi artikel..."
        />

        {errors.content && (
          <p className="text-sm text-red-600 mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* TAGS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>

        <div className="flex gap-4 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="React"
              {...register('tags')}
            />
            React
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="TypeScript"
              {...register('tags')}
            />
            TypeScript
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="Zod"
              {...register('tags')}
            />
            Zod
          </label>
        </div>

        {errors.tags && (
          <p className="text-sm text-red-600 mt-1">
            {errors.tags.message}
          </p>
        )}
      </div>

      {/* STATUS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>

        <select
          {...register('status')}
          className={fieldClass('status')}
        >
          <option value="draft">Draft</option>
          <option value="published">
            Published
          </option>
        </select>

        {errors.status && (
          <p className="text-sm text-red-600 mt-1">
            {errors.status.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
      >
        {isSubmitting
          ? 'Menyimpan...'
          : 'Buat Post'}
      </button>
    </form>
  );
}

export default CreatePostForm;