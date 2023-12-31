import "./App.css"
import { useState, useRef } from "react";
import ModelViewer from "./components/ModelViewer";

function App() {
  const [file, setFile] = useState<File | null>(null);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile ?? null);
  };

  return (
    <div className="main">
      <input type="file" ref={hiddenFileInput} onChange={handleFileUpload} />
      <button onClick={handleClick} className="file-upload">
        Upload a file
      </button>

      {
        file && <ModelViewer
          modelData={{
            url: URL.createObjectURL(file),
            extension: file.name.split(".").pop()?.toLowerCase() || ""
          }}
        />
      }
      {
        !file &&
        <div className="empty-msg">
          Please upload 3D(.glb, .obj, .fbx) or 2D(.webp, .png, .jpg) images
        </div>
      }
    </div>
  );
}

export default App;
