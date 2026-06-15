import { useState } from 'react';

function TimeForm() {
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setTime(
      new Date().toLocaleString('id-ID')
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Current Time
      </h1>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="
            w-full
            bg-blue-500
            text-white
            py-3
            rounded-lg
            hover:bg-blue-600
            transition
          "
        >
          Tampilkan Waktu
        </button>
      </form>

      {time && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="font-medium">
            {time}
          </p>
        </div>
      )}
    </div>
  );
}

export default TimeForm;