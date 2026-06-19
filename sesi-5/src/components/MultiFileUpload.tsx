import { useState, ChangeEvent } from "react";

function MultiFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (selectedFiles.length > 5) {
      setError("Maksimal 5 file.");
      return;
    }

    setError("");
    setFiles(selectedFiles);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const totalSizeMB = (
    files.reduce(
      (total, file) => total + file.size,
      0
    ) /
    1024 /
    1024
  ).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        Upload Multi File
      </h1>

      {/* Input File */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Info */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <p>
          <strong>Total File:</strong>{" "}
          {files.length}
        </p>

        <p>
          <strong>Total Ukuran:</strong>{" "}
          {totalSizeMB} MB
        </p>
      </div>

      {/* Preview Grid */}
      {files.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Preview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-3">
                  <p className="font-medium truncate">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeFile(index)
                    }
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center py-12 text-gray-500 border rounded-lg">
          Belum ada file dipilih
        </div>
      )}
    </div>
  );
}

export default MultiFileUpload;