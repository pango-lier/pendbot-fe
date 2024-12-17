import React, { useState } from "react";
import { Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import FileItem from "./FileItem";

interface FileManagerProps {
  files: any[];
  onFilesChange: (newFiles: any[]) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ files, onFilesChange }) => {
  // Xử lý tải lên tệp mới
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const newFiles = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    const updatedFiles = [...files, ...newFiles];
    onFilesChange(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*,video/*",
  });

  // Xử lý việc xóa tệp
  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles);
  };

  // Xử lý thay đổi vị trí của tệp
  const handleSortFiles = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(index, 1);
    if (direction === "up" && index > 0) {
      newFiles.splice(index - 1, 0, movedFile);
    } else if (direction === "down" && index < newFiles.length) {
      newFiles.splice(index + 1, 0, movedFile);
    }
    onFilesChange(newFiles);
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone-area mb-3">
        <input {...getInputProps()} />
        <span color="primary" className="upload-btn text-decoration-underline">
          Drag & Drop to Upload Files or Click to Select
        </span>
      </div>

      <div className="file-list row">
        {files.map((file, index) => (
          <div
            key={index}
            className="file-item-container col-4 justify-content-around mb-2"
          >
            <FileItem {...file} />
            {/* <div className="file-actions">
              <Button color="danger" onClick={() => handleRemoveFile(index)}>
                Remove
              </Button>
              <Button
                color="secondary"
                onClick={() => handleSortFiles(index, 'up')}
                disabled={index === 0}
              >
                Move Up
              </Button>
              <Button
                color="secondary"
                onClick={() => handleSortFiles(index, 'down')}
                disabled={index === files.length - 1}
              >
                Move Down
              </Button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
