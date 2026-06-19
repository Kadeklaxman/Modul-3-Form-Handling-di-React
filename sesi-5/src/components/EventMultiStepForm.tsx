import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  eventSchema,
  type EventFormData,
} from "../schemas/eventSchema";

function EventMultiStepForm() {
  const [step, setStep] =
    useState<number>(1);

  const [responseData, setResponseData] =
    useState<any>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),

    defaultValues: {
      title: "",
      category: "",
      date: "",
      description: "",

      venueType: "online",
      location: "",

      ticketPrice: 0,
      quota: 1,

      confirm: false,
    },
  });

  const nextStep = async () => {
    let fields: (keyof EventFormData)[] =
      [];

    if (step === 1) {
      fields = [
        "title",
        "category",
        "date",
        "description",
      ];
    }

    if (step === 2) {
      fields = [
        "venueType",
        "location",
        "ticketPrice",
        "quota",
      ];
    }

    const valid =
      await trigger(fields);

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (
    data: EventFormData
  ) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result =
      await response.json();

    setResponseData(result);
  };

  const values = watch();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        Create Event
      </h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`font-medium ${
                s <= step
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              Step {s}
            </span>
          ))}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${
                (step / 3) * 100
              }%`,
            }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Informasi Dasar
            </h2>

            <div>
              <input
                {...register("title")}
                placeholder="Judul Event"
                className="w-full border rounded-lg p-2"
              />

              <p className="text-red-500 text-sm">
                {errors.title?.message}
              </p>
            </div>

            <div>
              <select
                {...register(
                  "category"
                )}
                className="w-full border rounded-lg p-2"
              >
                <option value="">
                  Pilih Kategori
                </option>

                <option value="seminar">
                  Seminar
                </option>

                <option value="workshop">
                  Workshop
                </option>

                <option value="meetup">
                  Meetup
                </option>
              </select>

              <p className="text-red-500 text-sm">
                {
                  errors.category
                    ?.message
                }
              </p>
            </div>

            <div>
              <input
                type="date"
                {...register("date")}
                className="w-full border rounded-lg p-2"
              />

              <p className="text-red-500 text-sm">
                {errors.date?.message}
              </p>
            </div>

            <div>
              <textarea
                {...register(
                  "description"
                )}
                placeholder="Deskripsi Event"
                rows={4}
                className="w-full border rounded-lg p-2"
              />

              <p className="text-red-500 text-sm">
                {
                  errors.description
                    ?.message
                }
              </p>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Lokasi & Tiket
            </h2>

            <div>
              <select
                {...register(
                  "venueType"
                )}
                className="w-full border rounded-lg p-2"
              >
                <option value="online">
                  Online
                </option>

                <option value="offline">
                  Offline
                </option>
              </select>
            </div>

            <div>
              <input
                {...register(
                  "location"
                )}
                placeholder="URL Meeting / Alamat"
                className="w-full border rounded-lg p-2"
              />

              <p className="text-red-500 text-sm">
                {
                  errors.location
                    ?.message
                }
              </p>
            </div>

            <div>
              <input
                type="number"
                {...register(
                  "ticketPrice"
                )}
                placeholder="Harga Tiket"
                className="w-full border rounded-lg p-2"
              />

              <p className="text-red-500 text-sm">
                {
                  errors.ticketPrice
                    ?.message
                }
              </p>
            </div>

            <div>
              <input
                type="number"
                {...register(
                  "quota"
                )}
                placeholder="Kuota Peserta"
                className="w-full border rounded-lg p-2"
              />

              <p className="text-red-500 text-sm">
                {errors.quota?.message}
              </p>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Konfirmasi
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              <p>
                <strong>
                  Judul:
                </strong>{" "}
                {values.title}
              </p>

              <p>
                <strong>
                  Kategori:
                </strong>{" "}
                {values.category}
              </p>

              <p>
                <strong>
                  Tanggal:
                </strong>{" "}
                {values.date}
              </p>

              <p>
                <strong>
                  Deskripsi:
                </strong>{" "}
                {
                  values.description
                }
              </p>

              <p>
                <strong>
                  Venue:
                </strong>{" "}
                {
                  values.venueType
                }
              </p>

              <p>
                <strong>
                  Lokasi:
                </strong>{" "}
                {
                  values.location
                }
              </p>

              <p>
                <strong>
                  Harga:
                </strong>{" "}
                Rp{" "}
                {
                  values.ticketPrice
                }
              </p>

              <p>
                <strong>
                  Kuota:
                </strong>{" "}
                {values.quota}
              </p>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(
                  "confirm"
                )}
              />

              Saya yakin data sudah benar
            </label>

            <p className="text-red-500 text-sm">
              {errors.confirm?.message}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Sebelumnya
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              type="submit"
              disabled={
                isSubmitting
              }
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              {isSubmitting
                ? "Mengirim..."
                : "Submit Event"}
            </button>
          )}
        </div>
      </form>

      {/* API Response */}
      {responseData && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">
            Response API
          </h3>

          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(
              responseData,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default EventMultiStepForm;