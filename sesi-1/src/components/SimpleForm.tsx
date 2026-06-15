import { useState } from 'react';

function SimpleForm() {
  const [nama, setNama] = useState('');
  const [usia, setUsia] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(usia) < 17) {
      setError(
        'Usia minimal 17 tahun'
      );
      return;
    }

    setError('');
    alert(`Halo ${nama}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Form Validasi
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">
            Nama
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
            className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Usia
          </label>

          <input
            type="number"
            value={usia}
            onChange={(e) =>
              setUsia(e.target.value)
            }
            className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          />
        </div>

        {error && (
          <div
            className="
              bg-red-100
              text-red-600
              p-3
              rounded-lg
            "
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="
            w-full
            bg-green-500
            text-white
            py-3
            rounded-lg
            hover:bg-green-600
            transition
          "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SimpleForm;