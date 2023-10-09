import { useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";

export function Subclip() {
  const initialVideoFile = null;
  const initialStartTime = 0;
  const initialEndTime = 0;
  const initialFileName = "";

  const [videoFile, setVideoFile] = useState(initialVideoFile);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [fileName, setFileName] = useState(initialFileName);
  const [loading, setLoading] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("file_name", fileName);

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
        setVideoFile(initialVideoFile);
        setStartTime(initialStartTime);
        setEndTime(initialEndTime);
        setFileName(initialFileName);
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
        <input
          className="rounded-md border-2 ml-1"
          type="text"
          placeholder="Enter a name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Button color="blue" type="submit" className="ml-1" disabled={loading}>
          {loading ? "Loading..." : "Create Subclip"}
        </Button>
        {showDoneMessage && <div className="text-green-600 text-center">Done!</div>}
      </form>
    </div>
  );
}
