// src/components/MultiStepForm.tsx
import { useState, FormEvent } from "react";

interface FormData {
  // Step 1
  fullName: string;
  email: string;
  // Step 2
  street: string;
  city: string;
  zipCode: string;
  // Step 3
  agreeToTerms: boolean;
  // Step 4
  newsletter: boolean;
  theme: "terang" | "gelap" | "auto";
}

const initialData: FormData = {
  fullName: "",
  email: "",
  street: "",
  city: "",
  zipCode: "",
  agreeToTerms: false,
  newsletter: false,
  theme: "auto",
};

function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const totalSteps = 4;

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!data.fullName.trim()) newErrors.fullName = "Nama wajib diisi";
      if (!data.email) newErrors.email = "Email wajib diisi";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = "Format email tidak valid";
    } else if (step === 2) {
      if (!data.street.trim()) newErrors.street = "Alamat wajib diisi";
      if (!data.city.trim()) newErrors.city = "Kota wajib diisi";
      if (!data.zipCode.trim()) newErrors.zipCode = "Kode pos wajib diisi";
    } else if (step === 3) {
      if (!data.theme) {
        newErrors.theme = "Pilih tema";
      }
    } else if (step === 4) {
      if (!data.agreeToTerms)
        newErrors.agreeToTerms = "Anda harus menyetujui syarat";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;

    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Data registrasi:", data);
    alert("Registrasi berhasil!");
    setData(initialData);
    setStep(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm"
    >
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 text-center text-sm font-medium ${
                s <= step ? "text-blue-600" : "text-gray-400"
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded ${
                s <= step ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Data Diri</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              value={data.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Alamat</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jalan
            </label>
            <input
              value={data.street}
              onChange={(e) => updateField("street", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.street && (
              <p className="text-sm text-red-600 mt-1">{errors.street}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kota
              </label>
              <input
                value={data.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-sm text-red-600 mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kode Pos
              </label>
              <input
                value={data.zipCode}
                onChange={(e) => updateField("zipCode", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipCode && (
                <p className="text-sm text-red-600 mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Preferensi</h2>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.newsletter}
              onChange={(e) => updateField("newsletter", e.target.checked)}
            />
            <span>Berlangganan Newsletter</span>
          </label>

          <div>
            <p className="font-medium mb-2">Pilih Tema</p>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="terang"
                  checked={data.theme === "terang"}
                  onChange={(e) =>
                    updateField(
                      "theme",
                      e.target.value as "terang" | "gelap" | "auto",
                    )
                  }
                />
                Terang
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="gelap"
                  checked={data.theme === "gelap"}
                  onChange={(e) =>
                    updateField(
                      "theme",
                      e.target.value as "terang" | "gelap" | "auto",
                    )
                  }
                />
                Gelap
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="auto"
                  checked={data.theme === "auto"}
                  onChange={(e) =>
                    updateField(
                      "theme",
                      e.target.value as "terang" | "gelap" | "auto",
                    )
                  }
                />
                Auto
              </label>
            </div>

            {errors.theme && (
              <p className="text-red-600 text-sm mt-1">{errors.theme}</p>
            )}
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Konfirmasi</h2>
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <p>
              <strong>Nama:</strong> {data.fullName}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Alamat:</strong> {data.street}, {data.city} {data.zipCode}
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.agreeToTerms}
              onChange={(e) => updateField("agreeToTerms", e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              Saya menyetujui syarat dan ketentuan
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-600 mt-1">{errors.agreeToTerms}</p>
          )}
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-4 py-2 rounded-lg transition"
          >
            Sebelumnya
          </button>
        )}
        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Selanjutnya
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Kirim
          </button>
        )}
      </div>
    </form>
  );
}

export default MultiStepForm;
