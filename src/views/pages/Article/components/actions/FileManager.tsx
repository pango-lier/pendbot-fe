import React, { useState } from "react";
import { Card, CardHeader } from "reactstrap";
import { useDropzone } from "react-dropzone";
import FileItem from "./FileItem";
import EditFile from "./FileEdit";

interface FileManagerProps {
  files: any[];
  onFilesChange: (newFiles: any[]) => void;
}
const FileManager: React.FC<FileManagerProps> = ({ files, onFilesChange }) => {
  const [isEditingIndex, setIsEditingIndex] = useState<number | undefined>(
    undefined
  );

  // Xử lý tải lên tệp mới
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
      local: null,
      thumbnail: null,
    }));
    const updatedFiles = [...files, ...newFiles];
    onFilesChange(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*,video/*",
  });

  // Xử lý thay đổi vị trí của tệp
  const handleFiles = (
    index: number,
    direction: "up" | "down" | "delete" | "edit" | "create"
  ) => {
    if (direction === "delete") {
      const newFiles = files.filter((_, i) => i !== index);
      onFilesChange(newFiles);
    }
    if (direction === "edit") {
      setIsEditingIndex(index);
    } else {
      if (
        (direction === "up" && index <= 0) ||
        (direction === "down" && index >= files.length - 1)
      ) {
        return;
      }
      const newFiles = [...files];
      const [movedFile] = newFiles.splice(index, 1);
      if (direction === "up" && index > 0) {
        newFiles.splice(index - 1, 0, movedFile);
      } else if (direction === "down" && index < newFiles.length) {
        newFiles.splice(index + 1, 0, movedFile);
      }
      onFilesChange(newFiles);
    }
  };

  return (
    <Card className="p-2">
      {isEditingIndex !== undefined ? (
        <EditFile
          file={files[isEditingIndex]}
          onChange={(newFile) => {
            const updatedFiles = [...files];
            updatedFiles[isEditingIndex] = {
              ...updatedFiles[isEditingIndex],
              url: newFile?.url || null,
              name: newFile?.name || null,
              type: newFile?.type || null,
              thumbnail: newFile?.thumbnail || null,
              size: newFile?.size || null,
            };
            onFilesChange(updatedFiles);
            setIsEditingIndex(undefined);
          }}
          onClose={() => {
            setIsEditingIndex(undefined);
          }}
        />
      ) : (
        <>
          <div {...getRootProps()} className="dropzone-area mb-1">
            <input {...getInputProps()} />
            <span
              color="primary"
              className="upload-btn text-decoration-underline cursor-pointer"
            >
              Drag & Drop to Upload Files or Click to Select
            </span>
          </div>
          <div className="file-list d-flex">
            {files.map((file, index) => (
              <div
                key={index}
                style={{ width: "250px" }}
                className="file-item-container justify-content-around mb-1"
              >
                <FileItem
                  {...file}
                  handleFiles={(type) => handleFiles(index, type)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default FileManager;
