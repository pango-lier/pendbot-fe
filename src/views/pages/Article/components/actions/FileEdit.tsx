import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  Input,
} from "reactstrap";

const EditFile = ({ onChange, file, onClose }: any) => {
  const [newFile, setNewFile] = useState<any | undefined>(undefined);

  useEffect(() => {
    setNewFile(file);
  }, [file]);
  const isVideo =
    newFile?.url?.endsWith(".mp4") ||
    newFile?.url?.endsWith(".avi") ||
    newFile?.url?.endsWith(".mov");
  return (
    <>
      <Card className="border">
        <CardHeader>{`Edit file ${file?.name}`}</CardHeader>
        <CardBody className="row">
          <div className="file-item-container justify-content-around mb-1 w-25">
            {newFile?.thumbnail ? (
              <CardImg top width="100%" src={newFile?.thumbnail} alt="Thumb" />
            ) : isVideo ? (
              <video controls width="100%">
                <source src={newFile?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <CardImg top width="100%" src={newFile?.url || ""} alt="Image" />
            )}
          </div>

          <div className="w-75 px-5">
            <div className="mb-1">
              <label>Name</label>
              <Input
                type="text"
                value={newFile?.name || ""}
                onChange={(e) =>
                  setNewFile({
                    ...(newFile ? newFile : {}),
                    name: e?.target?.value || "",
                  })
                }
              />
            </div>
            <div className="mb-1">
              <label>URL</label>
              <Input
                type="text"
                value={newFile?.url || ""}
                onChange={(e) => {
                  console.log(e?.target?.value);
                  setNewFile({
                    ...(newFile ? newFile : {}),
                    url: e?.target?.value || "",
                  });
                }}
              />
            </div>
            <div className="mb-1">
              <label>Type</label>
              <Input
                type="text"
                value={newFile?.type || ""}
                onChange={(e) =>
                  setNewFile({
                    ...(newFile ? newFile : {}),
                    type: e?.target?.value || "",
                  })
                }
              />
            </div>
            <div className="mb-1">
              <label>Thumbnail URL</label>
              <Input
                type="text"
                value={newFile?.thumbnail || ""}
                onChange={(e) =>
                  setNewFile({
                    ...(newFile ? newFile : {}),
                    thumbnail: e?.target?.value || "",
                  })
                }
              />
            </div>
            <div className="mb-1">
              <label>Size</label>
              <Input
                type="number"
                value={newFile?.size || ""}
                onChange={(e) =>
                  setNewFile({
                    ...(newFile ? newFile : {}),
                    size: e?.target?.value ? parseInt(e?.target?.value) : "",
                  })
                }
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="d-flex justify-content-end">
          <div>
            <span
              className="px-4 py-1 border bg-primary text-light cursor-pointer"
              onClick={() => onChange(newFile)}
            >
              Save
            </span>
            <span
              className="px-4 py-1 border bg-danger text-light cursor-pointer"
              onClick={() => onClose()}
            >
              Cancel
            </span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditFile;
