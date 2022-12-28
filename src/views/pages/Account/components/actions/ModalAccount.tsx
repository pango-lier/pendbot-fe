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

import { createAccount } from "api/account/createAccount";
import { updateAccount } from "api/account/updateAccount";
import { deleteAccount } from "api/account/deleteAccount";
import { IAccount } from "../columns";
import { GroupEnum } from "api/group/enum/group.enum";
import { getGroups } from "api/group/getGroups";

interface IGroupSelect {
  value: number;
  label: string;
  id: number;
}

interface IModalIAccountProps {
  row: IAccount | undefined;
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
}: IModalIAccountProps) => {
  const [group, setGroup] = useState<IGroupSelect>();
  const [groupOptions, setGroupOptions] = useState<IGroupSelect[]>();
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [proxyId, setProxyId] = useState<string>("");
  const [proxyType, setProxyType] = useState<string>("");
  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();

  useEffect(() => {
    fetchGroups();
    if (row) {
      setName(row.name);
      setActive(row.active);
      setProxyId(row.proxyId);
      setProxyType(row.proxyType);
    }
  }, []);
  const fetchGroups = async () => {
    const groups = await getGroups();
    setGroupOptions(
      groups.data.result?.map((i) => {
        return {
          id: i.id,
          value: i.id,
          label: i.name,
        };
      })
    );
    if (row && row.groupId) {
      const fGroup = groups.data.result?.find((i) => i.id === row.groupId);
      if (fGroup)
        setGroup({
          id: fGroup.id,
          value: fGroup.id,
          label: fGroup.name,
        });
    }
  };
  useEffect(() => {
    if (action === ACTION_ENUM.Delete)
      setStyleAction({ pointerEvents: "none", opacity: "0.7" });
  }, [action]);

  const onChangeGroup = (e) => {
    setGroup(e);
    console.log(e);
    // groupOptions
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setName(e.target.value);
    }
  };
  const onChangeActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setActive(!active);
    }
  };
  const onChangeProxyId = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setProxyId(e.target.value);
    }
  };

  const onChangeProxyType = (e) => {
    if (e && e?.target) {
      setProxyType(e.target.value);
    }
  };

  const onAccept: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    switch (action) {
      case ACTION_ENUM.Create:
        const account = await createAccount({
          name,
          active: active,
          proxyId,
          proxyType,
          groupId: group?.id || null,
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        console.log(account);
        onHandleModal(account.data);
        break;
      case ACTION_ENUM.Edit:
        if (row?.id) {
          const update = await updateAccount(+row?.id, {
            name,
            active: active,
            proxyId,
            proxyType,
            groupId: group?.id || null,
          });
          setIsOpenModalGroup(!isOpenModalGroup);

          onHandleModal(update.data);
        }
        break;
      case ACTION_ENUM.Delete:
        if (row?.id) {
          await deleteAccount(+row.id);
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
                defaultValue={name}
                type="text"
                id="register-name"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-name">
                Name
              </Label>
              <ReactSelect
                defaultValue={group}
                value={group}
                className="react-select"
                options={groupOptions}
                onChange={(e) => onChangeGroup(e)}
                isClearable={true}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="proxy-id">
                Proxy Id
              </Label>
              <Input
                defaultValue={proxyId}
                id="proxy-id"
                type="text"
                placeholder="Proxy Id ..."
                onChange={(e) => onChangeProxyId(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="proxy-type">
                Proxy Type
              </Label>
              <Input
                defaultValue={proxyType}
                id="proxy-type"
                type="text"
                placeholder="proxy type ..."
                onChange={(e) => onChangeProxyType(e)}
              />
            </div>
            <div className="mb-1">
              <Label for="switch-primary" className="form-check-label">
                Active account
              </Label>
              <div className="form-switch form-check-primary">
                <Input
                  checked={active}
                  type="switch"
                  id="switch-primary"
                  name="primary"
                  onChange={(e) => onChangeActive(e)}
                />
              </div>
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
