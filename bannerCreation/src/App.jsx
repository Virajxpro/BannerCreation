import { useState } from "react";

const PREDEFINED_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Beauty",
  "Food & Beverages",
];

export default function App() {
  const [data, setData] = useState({
    title: "great indian festivale",
    percentageOff: "30",
    gradientType: "blue",
    categories: [],
    bannerFile: null,
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleAddCategory = (e) => {
    const value = e.target.value;
    if (value && !data.categories.includes(value)) {
      setData({ ...data, categories: [...data.categories, value] });
    }
    e.target.value = ""; // reset dropdown
  };

  const handleRemoveCategory = (cat) => {
    setData({
      ...data,
      categories: data.categories.filter((c) => c !== cat),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl">
        <p className="text-purple-600 font-semibold mb-3">Preview</p>

        {/* Banner Preview */}
        <div className="flex flex-col md:flex-row overflow-hidden rounded-xl shadow-lg">
          {/* Left side (gradient background) */}
          <div
            className={`flex-1 p-8 text-white relative flex flex-col justify-center bg-gradient-to-r ${
              data.gradientType === "orange"
                ? "from-orange-500 to-orange-600"
                : data.gradientType === "pink"
                ? "from-pink-500 to-pink-600"
                : data.gradientType === "purple"
                ? "from-purple-500 to-purple-600"
                : data.gradientType === "green"
                ? "from-green-500 to-green-600"
                : "from-blue-500 to-blue-600"
            }`}
          >
            {/* Decorative circle */}
            <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/10" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold capitalize">
                {data.title || "Sale Title"}
              </h2>
              <p className="text-4xl md:text-5xl font-extrabold mt-2">
                {data.percentageOff || 0}%{" "}
                <span className="text-xl font-medium">OFF</span>
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-4">
                {data.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {cat}
                    <button
                      onClick={() => handleRemoveCategory(cat)}
                      className="text-white/70 hover:text-white text-xs"
                    >
                      ❌
                    </button>
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="mt-6 bg-white text-black px-6 py-2 rounded-xl shadow hover:bg-gray-100">
                Shop Now
              </button>
            </div>
          </div>

          {/* Right side (uploaded image) */}
          <div className="flex-1 h-64 md:h-auto">
            {data.bannerFile ? (
              <img
                src={URL.createObjectURL(data.bannerFile)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image Selected
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-3">
          This is how your banner will appear to customers
        </p>

        {/* Controls Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side inputs */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
            />

            <label className="block mt-3 font-medium">Percentage Off</label>
            <input
              name="percentageOff"
              type="number"
              value={data.percentageOff}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
            />

            <label className="block mt-3 font-medium">Categories</label>
            <select
              onChange={handleAddCategory}
              className="border p-2 w-full rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>
                Select category
              </option>
              {PREDEFINED_CATEGORIES.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <p className="mt-3 font-semibold">Upload Banner</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setData({ ...data, bannerFile: e.target.files[0] })
              }
              className="mt-2"
            />
          </div>

          {/* Gradient selector */}
          <div>
            <p className="font-semibold">Select Gradient</p>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {["orange", "pink", "purple", "blue", "green"].map((g) => (
                <div
                  key={g}
                  onClick={() => setData({ ...data, gradientType: g })}
                  className={`h-12 rounded-lg cursor-pointer border-2 ${
                    data.gradientType === g
                      ? "border-black"
                      : "border-transparent"
                  } bg-gradient-to-r from-${g}-400 to-${g}-600`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
