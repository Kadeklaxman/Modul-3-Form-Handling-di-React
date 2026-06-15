import {
  ChangeEvent,
  useState,
} from 'react';

function ProfileImageUpload() {
  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState('');

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(image);

    alert(
      'Foto berhasil dipilih'
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-md
        mx-auto
        bg-white
        p-6
        rounded-xl
        shadow
      "
    >
      <h2 className="text-2xl font-bold mb-4">
        Upload Foto Profil
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleImageChange
        }
      />

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="
              w-40
              h-40
              rounded-full
              object-cover
              border
            "
          />
        </div>
      )}

      <button
        type="submit"
        className="
          mt-4
          w-full
          bg-blue-600
          text-white
          py-2
          rounded
        "
      >
        Simpan
      </button>
    </form>
  );
}

export default ProfileImageUpload;