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

import { createProxy } from "api/proxy/createProxy";
import { updateProxy } from "api/proxy/updateProxy";
import { deleteProxy } from "api/proxy/deleteProxy";
import { IProxy } from "../columns";
import { GroupEnum } from "api/group/enum/group.enum";
import { getGroups } from "api/group/getGroups";
import {
  enumToFormatSelected,
  enumToFormatSelectOptions,
} from "utility/helper/enum";
import { ProxyTypeEnum } from "api/proxy/enum/proxyType.enum";

interface IGroupSelect {
  value: number;
  label: string;
  id: number;
}

interface IModalIProxyProps {
  row: IProxy | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  onHandleModal: Function;
  action: ACTION_ENUM;
}
const ModalProxy = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  onHandleModal,
  action,
}: IModalIProxyProps) => {
  const [group, setGroup] = useState<IGroupSelect>();
  const [groupOptions, setGroupOptions] = useState<IGroupSelect[]>();
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [host, setHost] = useState<string>();
  const [port, setPort] = useState<number>();

  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [country_code, setCountryCode] = useState<string>();
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
      setHost(row.host);
      setPort(row.port);
      setUserName(row.username);
      setPassword(row.password);
      setCountryCode(row.country_code);
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

  const onChangeHost = (e) => {
    if (e && e?.target) {
      setHost(e.target.value);
    }
  };

  const onChangePort = (e) => {
    if (e && e?.target) {
      setPort(e.target.value);
    }
  };

  const onChangeUserName = (e) => {
    if (e && e?.target) {
      setUserName(e.target.value);
    }
  };

  const onChangePassword = (e) => {
    if (e && e?.target) {
      setPassword(e.target.value);
    }
  };

  const onChangeCountryCode = (e) => {
    if (e && e?.target) {
      setCountryCode(e.target.value);
    }
  };

  const onAccept: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    switch (action) {
      case ACTION_ENUM.Create:
        const proxy = await createProxy({
          name,
          active: active,
          proxyId,
          proxyType,
          groupId: group?.id || null,
          country_code,
          host,
          password,
          port,
          username,
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        console.log(proxy);
        onHandleModal(proxy.data);
        break;
      case ACTION_ENUM.Edit:
        if (row?.id) {
          const update = await updateProxy(+row?.id, {
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
          await deleteProxy(+row.id);
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
              <Label className="form-label" for="register-group">
                Group
              </Label>
              {/* <ReactSelect
                defaultValue={group}
                value={group}
                className="react-select"
                options={groupOptions}
                onChange={(e) => onChangeGroup(e)}
                isClearable={true}
              /> */}
              <ReactSelect
                defaultValue={enumToFormatSelected(ProxyTypeEnum, proxyType)}
                className="react-select"
                options={enumToFormatSelectOptions(ProxyTypeEnum)}
                isClearable={false}
                onChange={(e) => onChangeGroup(e)}
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
              <Label className="form-label" for="host">
                Host
              </Label>
              <Input
                defaultValue={host}
                id="host"
                type="text"
                placeholder="Host..."
                onChange={(e) => onChangeHost(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="port">
                Port
              </Label>
              <Input
                defaultValue={port}
                id="port"
                type="number"
                placeholder="Port ..."
                onChange={(e) => onChangePort(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="country">
                Country
              </Label>
              <Input
                defaultValue={country_code}
                id="country"
                type="text"
                placeholder="Country..."
                onChange={(e) => onChangeCountryCode(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="username">
                User name
              </Label>
              <Input
                defaultValue={username}
                id="username"
                type="text"
                placeholder="User name..."
                onChange={(e) => onChangeUserName(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="password">
                Password
              </Label>
              <Input
                defaultValue={password}
                id="password"
                type="text"
                placeholder="Password..."
                onChange={(e) => onChangePassword(e)}
              />
            </div>

            <div className="mb-1">
              <Label for="switch-primary" className="form-check-label">
                Active proxy
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

export default ModalProxy;
