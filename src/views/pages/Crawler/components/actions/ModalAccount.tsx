import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { ACTION_ENUM } from "utility/enum/actions";

import {
  enumToFormatSelectOptions,
  enumToFormatSelected,
} from "utility/helper/enum";
import { ICrawler } from "api/crawler/crawler/type/crawler.interface";
import { createCrawler } from "api/crawler/crawler/create";
import { updateCrawler } from "api/crawler/crawler/update";
import { deleteCrawler } from "api/crawler/crawler/delete";


interface IModalIAccountProps<T> {
  row: T | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  onHandleModal: Function;
  action: ACTION_ENUM;
}
const ModalAccount = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  onHandleModal,
  action,
}: IModalIAccountProps<ICrawler>) => {
  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  const [data, setData] = useState<ICrawler>();
  useEffect(() => {
    // fetchGroups();
    if (row) {
      setData(row);
    }
  }, []);

  useEffect(() => {
    if (action === ACTION_ENUM.Delete)
      setStyleAction({ pointerEvents: "none", opacity: "0.7" });
  }, [action]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>, name) => {
    if (e && e?.target) {
      const _d: any = { ...data };
      setData({ ..._d, [name]: e.target.value });
    }
  };

  const onAccept: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    switch (action) {
      case ACTION_ENUM.Create:
        if (!data?.name) return;
        const account = await createCrawler({
          name: data?.name,
          description: data.description,
          type: data.type,
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        console.log(account);
        onHandleModal(account.data);
        break;
      case ACTION_ENUM.Edit:
        if (!data?.name) return;
        if (row?.id) {
          const update = await updateCrawler(+row?.id, {
            name: data?.name,
            description: data.description,
            type: data.type,
          });
          setIsOpenModalGroup(!isOpenModalGroup);

          onHandleModal(update.data);
        }
        break;
      case ACTION_ENUM.Delete:
        if (row?.id) {
          await deleteCrawler(+row.id);
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandleModal({ id: row.id });
        }
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpenModalGroup}
        toggle={() => setIsOpenModalGroup(!isOpenModalGroup)}
      >
        <ModalHeader toggle={() => setIsOpenModalGroup(!isOpenModalGroup)}>
          Basic Modal
        </ModalHeader>
        <ModalBody>
          <Form className="auth-register-form mt-2" style={styleAction}>
            <div className="mb-1">
              <Label className="form-label" for="register-name">
                Name
              </Label>
              <Input
                value={data?.name || ""}
                type="text"
                id="register-name"
                placeholder="name"
                autoFocus
                onChange={(e) => onChangeName(e, "name")}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-description">
                Description
              </Label>
              <Input
                value={data?.description || ""}
                type="text"
                id="register-description"
                placeholder="description"
                autoFocus
                onChange={(e) => onChangeName(e, "description")}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-links">
                Target
              </Label>
              <Input
                value={data?.links || ""}
                type="text"
                id="register-links"
                placeholder="links"
                autoFocus
                onChange={(e) => onChangeName(e, "links")}
              />
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onAccept(e)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

//ModalGroup.propTypes = {};

export default ModalAccount;
