// src/components/FileUploadForm.tsx
import { useState , useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const progressTimer = useRef<number | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setErrorMessage('File harus berupa gambar');
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran file maksimal 5MB');
      return;
    }

    setErrorMessage(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // Simulasi progress berdasarkan size file sebagai pendekatan kasar.
  // Bukan progress real dari network — itu butuh XHR. Tapi cukup untuk UX feedback.
  const startFakeProgress = (fileSize: number) => {
    setUploadProgress(0);
    // Asumsi: progress naik ~5% per 100ms, selesai sekitar 1.5-2 detik untuk file normal.
    // File lebih besar = progress lebih lambat supaya user lihat animasinya.
    const tickMs = 100;
    const increment = Math.max(2, Math.round(50000 / fileSize));
    progressTimer.current = window.setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          if (progressTimer.current) {
            clearInterval(progressTimer.current);
            progressTimer.current = null;
          }
          return 95;
        }
        return prev + increment;
      });
    }, tickMs);
  };

  const stopFakeProgress = () => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);

    startFakeProgress(file.size);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      stopFakeProgress();
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`Upload gagal dengan status ${response.status}`);
      }

      // Optional: baca response kalau perlu
      // await response.json();

      alert('Upload berhasil!');
      setFile(null);
      setPreview(null);
      setCaption('');
      setUploadProgress(0);
    } catch (error) {
      stopFakeProgress();
      setUploadProgress(0);
      setErrorMessage(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className='max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow-sm'>
      <h2 className='text-2xl font-bold text-gray-900'>Upload Foto</h2>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Pilih Foto</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />
      </div>

      {errorMessage && (
        <p className='text-sm text-red-600'>{errorMessage}</p>
      )}

      {preview && (
        <div className='border border-gray-200 rounded-lg p-2'>
          <img src={preview} alt='Preview' className='w-full h-48 object-cover rounded' />
        </div>
      )}

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Caption</label>
        <input
          type='text'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Tulis caption...'
        />
      </div>

      {isUploading && (
        <div>
          <div className='flex justify-between text-sm text-gray-600 mb-1'>
            <span>Mengupload...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-blue-600 h-2 rounded-full transition-all'
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <button
        type='submit'
        disabled={!file || isUploading}
        className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg transition'
      >
        {isUploading ? 'Mengupload...' : 'Upload'}
      </button>
    </form>
  );
}

export default FileUploadForm;