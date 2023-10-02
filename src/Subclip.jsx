import { useState } from "react";
import axios from "axios";

export function Subclip() {
  const [videoFile, setvideoFile] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const handleFileChange = (e) => {
    setvideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Subclip Video</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <input
          type="number"
          placeholder="Start Time (seconds)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="End Time (seconds)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button type="submit">Create Subclip</button>
      </form>
    </div>
  );
}
