import { IFile } from "api/articles/type/type.interface";
import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

// Kiểu dữ liệu cho tệp
interface FileItemProps extends IFile {}

const FileItem: React.FC<FileItemProps> = ({ url, thumb }) => {
  const isVideo =
    url.endsWith(".mp4") || url.endsWith(".avi") || url.endsWith(".mov");

  return (
    <div className="file-item">
      <Card>
        {thumb ? (
          // Nếu có thumb, hiển thị ảnh thu nhỏ
          <CardImg top width="100%" src={thumb} alt="Thumb" />
        ) : isVideo ? (
          // Nếu không có thumb và là video, hiển thị video
          <video controls width="100%">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Nếu không có thumb và không phải video, hiển thị hình ảnh
          <CardImg top width="100%" src={url} alt="Image" />
        )}
        <CardBody>
          <CardText style={{ fontSize: "12px" }}>{url}</CardText>
          <Button href={url} target="_blank" color="primary">
            Download
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default FileItem;
