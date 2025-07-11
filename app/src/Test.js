import React, { useState } from "react";

export const Test = () => {
  const [handleLapData, sethandleLapData] = useState({
    time: "",
    tyre: "",
    trackTemp: "",
    weather: "",
  });
  const [customPrediction, setCustomPrediction] = useState(null);
  const [nextlap, setnextlap] = useState(null);
  const onChange = (e) => {
    const { name, value } = e.target;
    sethandleLapData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitData = async (e) => {
    e.preventDefault();
    const inputData = {
      time: parseFloat(handleLapData.time),
      tyre: handleLapData.tyre,
      trackTemp: parseFloat(handleLapData.trackTemp), // 🔧 changed from `tracktemp`
      weather: handleLapData.weather,
    };
    try {
      const response = await fetch("http://localhost:5001/custom_predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
      const result = await response.json();
      setCustomPrediction(result.prediction);
    } catch (err) {
      console.error("Custom input error", err);
    }
  };
  const nextLap = async (e) => {
    e.preventDefault();
    const inputData = {
      time: parseFloat(handleLapData.time),
      tyre: handleLapData.tyre,
      trackTemp: parseFloat(handleLapData.trackTemp), // 🔧 changed from `tracktemp`
      weather: handleLapData.weather,
    };
    try {
      const response = await fetch("http://localhost:5001/nextlap_predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
      const result = await response.json();
      setnextlap(result.prediction);
    } catch (err) {
      console.error("Custom input error", err);
    }
  };
  return (
    <div className="App">
      <form
        onSubmit={handleSubmitData}
        className="p-10 flex flex-col space-y-6 max-w-md mx-auto"
      >
        <input
          placeholder="time"
          name="time"
          value={handleLapData.time}
          onChange={onChange}
          className="border-2 border-gray-600 text-white bg-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          placeholder="tyre"
          name="tyre"
          value={handleLapData.tyre}
          onChange={onChange}
          className="border-2 border-gray-600 bg-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          placeholder="trackTemp"
          name="trackTemp"
          value={handleLapData.trackTemp}
          onChange={onChange}
          className="border-2 border-gray-600 bg-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          placeholder="weather"
          name="weather"
          value={handleLapData.weather}
          onChange={onChange}
          className="border-2 border-gray-600 bg-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Data
        </button>
        {customPrediction && (
          <p className="mt-2  text-green-700 p-4 rounded">
            Custom Prediction Result: {customPrediction}
          </p>
        )}
      </form>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={nextLap}
      >
        Next Lap
      </button>
      {nextlap && (
        <p className="mt-2  text-green-700 p-4 rounded">
          Next Lap Result: {nextlap}
        </p>
      )}
    </div>
  );
};
