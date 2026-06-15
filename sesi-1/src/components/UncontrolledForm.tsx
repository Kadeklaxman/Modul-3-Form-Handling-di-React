import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Nama: ${nameRef.current.value}`
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Uncontrolled Form
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
            ref={nameRef}
            placeholder="Masukkan nama"
            className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              focus:ring-2
              focus:ring-purple-500
              focus:outline-none
            "
          />
        </div>

        <button
          type="submit"
          className="
            w-full
            bg-purple-500
            text-white
            py-3
            rounded-lg
            hover:bg-purple-600
            transition
          "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UncontrolledForm;