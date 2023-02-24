
import { deleteSocial } from "api/socials/delete";
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

import { notifyError, notifySuccess } from "utility/notify";

import { IRow } from "../columns";
import { createArticle } from "../../../../../api/articles/create";
import { updateArticle } from "../../../../../api/articles/update";
import { deleteArticle } from "../../../../../api/articles/delete";

interface IModalGroupProps {
  row: IRow | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  action: ACTION_ENUM;
  onHandle: Function;
}
const ModalUser = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  action,
  onHandle,
}: IModalGroupProps) => {

  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  const [data, setData] = useState<IRow>();
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


  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      switch (action) {
        case ACTION_ENUM.Create:
          if (!data) return;
          const group = await createArticle(data);
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(group.data);

          break;
        case ACTION_ENUM.Edit:
          if (!row?.id) return;
          if (!data) return;
          const update = await updateArticle(row?.id, {
            ...data,
            userId: +(row?.userId || 0)
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(update.data);

          break;
        case ACTION_ENUM.Delete:
          if (!row?.id) return;
          const destroy = await deleteArticle(
            row?.id,
          );
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(row);

          break;
        default:
          break;
      }
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModalGroup}
        toggle={() => setIsOpenModalGroup(!isOpenModalGroup)}
      >
        <ModalHeader toggle={() => setIsOpenModalGroup(!isOpenModalGroup)}>
          Group Modal
        </ModalHeader>
        <ModalBody>
          <Form className="auth-register-form mt-2" style={styleAction}>
            <div className="mb-1">
              <Label className="form-label" for="register-title">
                Title
              </Label>
              <Input
                defaultValue={data?.title}
                type="text"
                id="register-title"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e, 'title')}
              />
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => create(e)}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

//ModalGroup.propTypes = {};

export default ModalUser;
