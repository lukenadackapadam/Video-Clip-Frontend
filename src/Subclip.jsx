import { useState } from "react";
import axios from "axios";

export function Subclip() {
  const [videoFile, setvideoFile] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  const handleFileChange = (e) => {
    setvideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);

    try {
      const response = await axios.post("http://localhost:5000/subclip", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setShowDoneMessage(true);
      setTimeout(() => {
        setShowDoneMessage(false);
      }, 3000);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center font-mono">
      <h1 className="basis-full text-2xl mt-3 ml-1">Video Subclip</h1>
      <form onSubmit={handleSubmit} className="basis-full space-y-5">
        <input className="ml-1" type="file" accept="video/*" onChange={handleFileChange} />
        <input
          className="rounded-md border-2"
          type="number"
          placeholder="Start Time (seconds)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          className="rounded-md border-2 ml-1"
          type="number"
          placeholder="End Time (seconds)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button type="submit" className="animate-bounce ml-4" disabled={loading}>
          {loading ? "Loading..." : "Create Subclip"}
        </button>
        {showDoneMessage && <div className="text-green-600 ml-10">Done!</div>}
      </form>
    </div>
  );
}
