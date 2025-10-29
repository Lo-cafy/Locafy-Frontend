import { useState, useRef, useEffect } from "react";
import { Camera, X, RotateCcw, Check } from "lucide-react";

interface LiveCameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function LiveCameraCapture({ onCapture, onClose }: LiveCameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 }
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => setIsCameraReady(true);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to access camera. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // ✅ Fully release webcam
    }
    setIsCameraReady(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(dataURL);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    stopCamera();
    startCamera(); // ✅ Restart camera feed correctly
  };

  const confirmPhoto = () => {
    if (!capturedImage) return;

    fetch(capturedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: "image/jpeg" });
        onCapture(file);
      })
      .finally(() => {
        stopCamera(); // ✅ Release camera permission
        onClose();
      });
  };

  const handleClose = () => {
    stopCamera(); // ✅ Always release camera on exit
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Camera className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Capture Your Photo</h3>
            <p className="text-sm text-gray-600">Position your face in the center</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
          {!capturedImage ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <p className="text-white">Loading camera...</p>
                </div>
              )}
            </>
          ) : (
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="mt-6 flex gap-3">
          {!capturedImage ? (
            <button
              onClick={capturePhoto}
              disabled={!isCameraReady}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Camera className="h-5 w-5" />
              Capture Photo
            </button>
          ) : (
            <>
              <button
                onClick={retakePhoto}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Retake
              </button>
              <button
                onClick={confirmPhoto}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Check className="h-5 w-5" />
                Use This Photo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
