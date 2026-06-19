import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { productSchema } from '../schemas/productSchema';
import type { ProductFormData } from '../schemas/productSchema';

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      category: 'electronics',
      imageUrl: '',
    },
  });

  const onSubmit = async (
    data: ProductFormData
  ) => {
    console.log('Product:', data);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    alert('Produk berhasil disimpan');

    reset();
  };

  const fieldClass = (
    fieldName: keyof ProductFormData
  ) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
      errors[fieldName]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-blue-500'
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Product Form
      </h2>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Produk
        </label>

        <input
          {...register('name')}
          className={fieldClass('name')}
          placeholder="Masukkan nama produk"
        />

        {errors.name && (
          <p className="text-sm text-red-600 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* PRICE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Harga
        </label>

        <input
          type="number"
          {...register('price')}
          className={fieldClass('price')}
          placeholder="50000"
        />

        {errors.price && (
          <p className="text-sm text-red-600 mt-1">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* STOCK */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stok
        </label>

        <input
          type="number"
          {...register('stock')}
          className={fieldClass('stock')}
          placeholder="10"
        />

        {errors.stock && (
          <p className="text-sm text-red-600 mt-1">
            {errors.stock.message}
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
          <option value="electronics">
            Electronics
          </option>

          <option value="fashion">
            Fashion
          </option>

          <option value="food">
            Food
          </option>
        </select>

        {errors.category && (
          <p className="text-sm text-red-600 mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* IMAGE URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Foto URL (Opsional)
        </label>

        <input
          type="url"
          {...register('imageUrl')}
          className={fieldClass('imageUrl')}
          placeholder="https://example.com/image.jpg"
        />

        {errors.imageUrl && (
          <p className="text-sm text-red-600 mt-1">
            {errors.imageUrl.message}
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
          : 'Simpan Produk'}
      </button>
    </form>
  );
}

export default ProductForm;