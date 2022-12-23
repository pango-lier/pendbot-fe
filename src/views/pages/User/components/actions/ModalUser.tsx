import React, { useEffect, useState } from "react";
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

import { UserI } from "../columns";
import { createUser } from "api/user/createUser";
import { updateUser } from "api/user/updateUser";
import { deleteUser } from "api/user/deleteUser";

interface IModalGroupProps {
  row: UserI | undefined;
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
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  useEffect(() => {
    if (row) {
      setName(row.name);
    }
  }, [row]);
  useEffect(() => {
    if (action === ACTION_ENUM.Delete)
      setStyleAction({ pointerEvents: "none", opacity: "0.7" });
  }, [action]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setName(e.target.value);
    }
  };
  const onChangeEmail = (e) => {
    if (e && e?.target) {
      setEmail(e.target.value);
    }
  };
  const onChangePassword = (e) => {
    if (e && e?.target) {
      setPassword(e.target.value);
    }
  };

  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      switch (action) {
        case ACTION_ENUM.Create:
          const group = await createUser({
            name,
            email: email,
            password: password,
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(group.data.createOneUserDto);

          break;
        case ACTION_ENUM.Edit:
          const update = await updateUser({
            id: row?.id,
            name,
            email: email,
            password: password,
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(update.data.updateOneUserDto);

          break;
        case ACTION_ENUM.Delete:
          const destroy = await deleteUser({
            id: row?.id,
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(destroy.data.deleteOneUserDto);

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
              <Label className="form-label" for="register-name">
                Name
              </Label>
              <Input
                defaultValue={name}
                type="text"
                id="register-name"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-email">
                Email
              </Label>
              <Input
                defaultValue={email}
                type="email"
                id="register-email"
                placeholder="john@example.com"
                onChange={(e) => onChangeEmail(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-password">
                Password
              </Label>
              <Input
                type="email"
                id="register-password"
                placeholder="password"
                onChange={(e) => onChangePassword(e)}
              />
              {/* <InputPasswordToggle
                className="input-group-merge"
                id="register-password"
                onChange={(e) => onChangePassword(e)}
              /> */}
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
