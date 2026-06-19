import { useState, FormEvent } from "react";

interface Experience {
  company: string;
  position: string;
}

interface JobFormData {
  fullName: string;
  email: string;
  experiences: Experience[];
}

const initialData: JobFormData = {
  fullName: "",
  email: "",
  experiences: [
    {
      company: "",
      position: "",
    },
  ],
};

function JobApplicationForm() {
  const [step, setStep] = useState<number>(1);

  const [data, setData] =
    useState<JobFormData>(initialData);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const totalSteps = 3;

  const updateField = <
    K extends keyof JobFormData
  >(
    field: K,
    value: JobFormData[K]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          company: "",
          position: "",
        },
      ],
    }));
  };

  const removeExperience = (
    index: number
  ) => {
    setData((prev) => ({
      ...prev,
      experiences:
        prev.experiences.filter(
          (_, i) => i !== index
        ),
    }));
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      experiences:
        prev.experiences.map((exp, i) =>
          i === index
            ? {
                ...exp,
                [field]: value,
              }
            : exp
        ),
    }));
  };

  const validateStep = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (step === 1) {
      if (!data.fullName.trim()) {
        newErrors.fullName =
          "Nama wajib diisi";
      }

      if (!data.email.trim()) {
        newErrors.email =
          "Email wajib diisi";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          data.email
        )
      ) {
        newErrors.email =
          "Format email tidak valid";
      }
    }

    if (step === 2) {
      data.experiences.forEach(
        (exp, index) => {
          if (!exp.company.trim()) {
            newErrors[
              `company-${index}`
            ] = "Perusahaan wajib diisi";
          }

          if (!exp.position.trim()) {
            newErrors[
              `position-${index}`
            ] = "Posisi wajib diisi";
          }
        }
      );
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
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

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    alert("Lamaran berhasil dikirim!");

    console.log(data);

    setData(initialData);
    setStep(1);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 text-center font-medium ${
                s <= step
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded ${
                s <= step
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Data Pribadi
          </h2>

          <div>
            <label className="block mb-1">
              Nama Lengkap
            </label>

            <input
              type="text"
              value={data.fullName}
              onChange={(e) =>
                updateField(
                  "fullName",
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              value={data.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Pengalaman Kerja
          </h2>

          {data.experiences.map(
            (exp, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-3"
              >
                <h3 className="font-semibold">
                  Pengalaman #{index + 1}
                </h3>

                <div>
                  <input
                    type="text"
                    placeholder="Nama Perusahaan"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                    className="w-full border rounded p-2"
                  />

                  {errors[
                    `company-${index}`
                  ] && (
                    <p className="text-red-500 text-sm">
                      {
                        errors[
                          `company-${index}`
                        ]
                      }
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Posisi"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "position",
                        e.target.value
                      )
                    }
                    className="w-full border rounded p-2"
                  />

                  {errors[
                    `position-${index}`
                  ] && (
                    <p className="text-red-500 text-sm">
                      {
                        errors[
                          `position-${index}`
                        ]
                      }
                    </p>
                  )}
                </div>

                {data.experiences.length >
                  1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeExperience(
                        index
                      )
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Hapus
                  </button>
                )}
              </div>
            )
          )}

          <button
            type="button"
            onClick={addExperience}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Tambah Pengalaman
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Konfirmasi
          </h2>

          <div className="bg-gray-100 p-4 rounded">
            <p>
              <strong>Nama:</strong>{" "}
              {data.fullName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {data.email}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Pengalaman Kerja
            </h3>

            {data.experiences.map(
              (exp, index) => (
                <div
                  key={index}
                  className="border p-3 rounded mb-2"
                >
                  <p>
                    <strong>
                      Perusahaan:
                    </strong>{" "}
                    {exp.company}
                  </p>

                  <p>
                    <strong>Posisi:</strong>{" "}
                    {exp.position}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Sebelumnya
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Selanjutnya
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Kirim Lamaran
          </button>
        )}
      </div>
    </form>
  );
}

export default JobApplicationForm;