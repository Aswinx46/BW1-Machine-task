
import { updateKyc, uploadImageCloudinary, uploadVideoCloudinary } from "@/services/user/userServices";
import { addUser } from "@/store/slices/user/userSlice";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

type Mode = "image" | "video" | null;
type FacingMode = "user" | "environment";

const CameraCapture: React.FC<{ email: string }> = ({ email }) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const dispatch = useDispatch()
  const [mode, setMode] = useState<Mode>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [facingMode, setFacingMode] = useState<FacingMode>("user");

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode,
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const startRecording = () => {
    setRecordedChunks([]);
    const stream = webcamRef.current?.stream;
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recorded_video.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const closeCamera = () => {
    setMode(null);
    setCapturedImage(null);
    setRecordedChunks([]);
    setRecording(false);
  };

  const handleVerifyVideo = async () => {
    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("file", videoBlob);
    formData.append("upload_preset", "BW1_kyc"); // change this
    formData.append('cloud_name', 'dyrx8qjpt');
    const uploadVideoResponse = await uploadVideoCloudinary(formData)
    const updateKycResponse = await updateKyc(email, uploadVideoResponse.secure_url, "video")
    toast.success(updateKycResponse.message)
    dispatch(addUser(updateKycResponse.updatedUser))
    closeCamera()
  }

  const handleImageUpload = async () => {
    if (!capturedImage) {
      toast.error("select a image")
      return
    }
    const blob = new Blob([capturedImage], { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "BW1_kyc");
    formData.append('cloud_name', 'dyrx8qjpt');
    const updateImageReponse = await uploadImageCloudinary(formData)
    const updateKycResponse = await updateKyc(email, updateImageReponse.secure_url, "image")
    toast.success(updateKycResponse.message)
    dispatch(addUser(updateKycResponse.updatedUser))
    closeCamera()
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-black shadow-md rounded-lg space-y-6">
      {/* <h2 className="text-2xl font-bold text-center">📷 Camera App</h2> */}

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setMode("image")}
        >
          📸 Capture Image
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setMode("video")}
        >
          🎥 Record Video
        </button>
      </div>

      {mode && (
        <>
          <Webcam
            ref={webcamRef}
            audio={mode === "video"}
            height={360}
            width={480}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded border mx-auto"
          />

          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={switchCamera}
            >
              🔄 Switch Camera
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={closeCamera}
            >
              ❌ Close Camera
            </button>
          </div>
        </>
      )}

      {mode === "image" && (
        <div className="space-y-4 text-center">
          <button
            className="px-4 py-2 bg-green-600 me-3 text-white rounded hover:bg-green-700"
            onClick={captureImage}
          >
            📸 Take Photo
          </button>
          {capturedImage && (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleImageUpload}
            >
              Verify KYC
            </button>
          )}
          {capturedImage && (

            <div className="mt-2">
              <h4 className="text-lg text-white font-semibold mb-2">Preview:</h4>
              <img
                src={capturedImage}
                alt="Captured"
                className="rounded-lg border shadow mx-auto max-w-xs"
              />
            </div>
          )}
        </div>
      )}

      {mode === "video" && (
        <div className="space-y-4 text-center">
          {recording ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={stopRecording}
            >
              ⏹ Stop Recording
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={startRecording}
            >
              ⏺ Start Recording
            </button>
          )}

          {recordedChunks.length > 0 && (
            <>
              <button
                className="px-4 py-2 bg-indigo-600 me-3 text-white rounded hover:bg-indigo-700"
                onClick={downloadVideo}
              >
                ⬇️ Download Video
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleVerifyVideo}
              >
                ⬇️ Verify Now
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
