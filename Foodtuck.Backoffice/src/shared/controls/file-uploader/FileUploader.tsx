import { Button } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface IProps {
  uploadUrl: string;
  onFileUploaded: (file: File, url?: string) => void;
  acceptFiles?: string;
}

function FileUploader({ uploadUrl, onFileUploaded, acceptFiles = 'image/*,.pdf' }: IProps) {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    handleUpload()
  }, [file])

  const handleUpload = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    axios.post(
      uploadUrl, 
      formData
    )
      .then(({data}: any) => onFileUploaded(file, data.fileUrl))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange}
        accept={acceptFiles}
      />
    </div>
  );
}

export default FileUploader;