"use client";
import { Edit, Info, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import StarRating from "./StarRating";

const addReview = async (id, name, email, rating, review) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/reviews/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        rating,
        review,
      }),
    });

    const data = await response.json();
    console.log(data);
    return [data, response.status];
  } catch (error) {
    console.error("error adding a review:", error.message);
    return null;
  }
};

export default function AddAReview({ button, id }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [inputReview, setReview] = useState("");
  const [inputReviewer, setReviewer] = useState("");
  const [inputEmail, setEmail] = useState("");
  const [inputRating, setRating] = useState(0);

  const inputList = [
    ["نام", inputReviewer, setReviewer],
    ["ایمیل", inputEmail, setEmail],

    ["دیدگاه", inputReview, setReview],
  ];

  async function submitForm() {
    if (
      inputReviewer == "" ||
      inputReview == "" ||
      inputEmail == "" ||
      inputRating == 0
    ) {
      setError("لطفا همه ی فیلد ها را کامل کنید.");
    } else {
      setLoading(true);
      setError("");

      let response = await addReview(
        id,
        inputReviewer,
        inputEmail,
        inputRating,
        inputReview
      );
      setLoading(false);
      window.location.reload();
      setOverlay(false);
    }
  }

  function closeTheOverlay() {
    setEmail("");
    setRating(0);
    setReview("");
    setReviewer("");
    setError("");
    setOverlay(false);
  }

  return (
    <div>
      <button
        className="px-10 py-3 bg-primary text-white rounded-md w-full"
        onClick={() => setOverlay(true)}
      >
        {button}
      </button>
      {overlay && (
        <div className="h-screen w-screen fixed inset-0 flex bg-black/50 z-[9999999] justify-center items-center">
          <div className="flex flex-col gap-5 w-full mx-4 md:w-[600px] bg-white border border-gray-300 rounded-lg py-4 px-6">
            <div className="flex flex-row justify-between">
              <p className="text-black text-lg font-bold">افزودن دیدگاه</p>
              <button>
                <X onClick={loading ? null : closeTheOverlay} />
              </button>
            </div>
            <div className="grid gap-2 grid-cols-1 text-black">
              {inputList.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-[#7c7c7c]">{item[0]}</p>
                  {item[0] == "دیدگاه" ? (
                    <textarea
                      onChange={(e) => item[2](e.target.value)}
                      value={item[1]}
                      disabled={loading ? true : false}
                      className="border border-[#dedede] rounded-md p-2 max-h-[200px]"
                    />
                  ) : (
                    <input
                      disabled={loading ? true : false}
                      className={`border border-[#dedede] rounded-md p-2`}
                      type={
                        item[0] == "امتیاز"
                          ? "number"
                          : item[0] == "ایمیل"
                          ? "email"
                          : "text"
                      }
                      value={item[1]}
                      onChange={(e) => item[2](e.target.value)}
                    />
                  )}
                </div>
              ))}
              <StarRating onRatingSelect={(rating) => setRating(rating)} />
              {error && (
                <div className="flex items-center gap-1 my-2">
                  <Info className="text-red-600" size={20} />
                  <p className="text-red-600 font-bold">{error}</p>
                </div>
              )}
            </div>
            <div className="flex flex-row-reverse gap-3 text-black">
              <button
                onClick={submitForm}
                className="p-2 bg-primary rounded-md text-white"
              >
                {loading ? (
                  <Image
                    src={"/images/loading-gif.gif"}
                    width={24}
                    height={30}
                    alt="Loading gif"
                  />
                ) : (
                  <p>ثبت دیدگاه</p>
                )}
              </button>
              <button
                onClick={loading ? null : closeTheOverlay}
                className="py-2 px-5 bg-gray-200 rounded-md"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
