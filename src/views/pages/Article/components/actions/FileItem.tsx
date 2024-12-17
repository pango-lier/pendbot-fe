import { IFile } from "api/articles/type/type.interface";
import React from "react";
import * as Icon from "react-feather";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

// Kiểu dữ liệu cho tệp
interface FileItemProps extends IFile {
  handleFiles: (type: "up" | "down" | "delete" | "edit" | "create") => void;
}

const FileItem: React.FC<FileItemProps> = ({
  url,
  thumbnail,
  name,
  handleFiles,
}) => {
  const isVideo =
    url?.endsWith(".mp4") || url?.endsWith(".avi") || url?.endsWith(".mov");

  return (
    <div className="file-item border">
      <Card>
        {thumbnail ? (
          // Nếu có thumb, hiển thị ảnh thu nhỏ
          <CardImg top width="100%" src={thumbnail} alt="Thumb" />
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
          <CardText style={{ fontSize: "12px" }}>{name}</CardText>
          <div className="d-flex justify-content-around">
            <Icon.Download
              onClick={() => {
                window.open(url);
              }}
            />
            <Icon.Trash
              className="text-danger cursor-pointer"
              onClick={() => handleFiles("delete")}
            />
            <Icon.ArrowUp
              className="text-success cursor-pointer"
              onClick={() => handleFiles("up")}
            />
            <Icon.ArrowDown
              className="cursor-pointer"
              onClick={() => handleFiles("down")}
            />
            <Icon.Edit
              className="cursor-pointer"
              onClick={() => handleFiles("edit")}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FileItem;
