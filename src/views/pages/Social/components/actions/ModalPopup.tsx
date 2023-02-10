import { createSocial } from "api/socials/create";
import { deleteSocial } from "api/socials/delete";
import { SocialEnum } from "api/socials/enum/socials.enum";
import { ISocial } from "api/socials/type/socials.interface";
import { updateSocial } from "api/socials/update";
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
import { enumToFormatSelected, enumToFormatSelectOptions } from "utility/helper/enum";

import { notifyError, notifySuccess } from "utility/notify";

import { IRow } from "../columns";

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
  const [type, setType] = useState<SocialEnum>(SocialEnum.NONE);

  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  const [data, setData] = useState<ISocial>();
  useEffect(() => {
    // fetchGroups();
    if (row) {
      setData(row);
      setType(row?.socialType || SocialEnum.NONE);
      console.log(SocialEnum, row?.socialType, enumToFormatSelected(SocialEnum, row?.socialType));
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

  const onChangeType = (e) => {
    setType(e.value);
    setData({ ...data, socialType: e.value });
  };

  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      switch (action) {
        case ACTION_ENUM.Create:
          if (!data) return;
          const group = await createSocial(data);
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(group.data);

          break;
        case ACTION_ENUM.Edit:
          if (!row?.id) return;
          if (!data) return;
          const update = await updateSocial(row?.id, {
            ...data,
            userId: +(row?.userId || 0)
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(update.data);

          break;
        case ACTION_ENUM.Delete:
          if (!row?.id) return;
          const destroy = await deleteSocial(
            row?.id,
          );
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(destroy.data);

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
              <Label className="form-label" for="register-type">
                Crawler Link Type
              </Label>
              <ReactSelect
                id="register-type"
                value={enumToFormatSelected(SocialEnum, type)}
                className="react-select"
                options={enumToFormatSelectOptions(SocialEnum)}
                onChange={(e) => onChangeType(e)}
                isClearable={true}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-name">
                Name
              </Label>
              <Input
                defaultValue={data?.name}
                type="text"
                id="register-name"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e, 'name')}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-username">
                Username
              </Label>
              <Input
                defaultValue={data?.username}
                type="text"
                id="register-username"
                placeholder="john@example.com"
                onChange={(e) => onChangeName(e, 'username')}
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
                onChange={(e) => onChangeName(e, 'password')}
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
