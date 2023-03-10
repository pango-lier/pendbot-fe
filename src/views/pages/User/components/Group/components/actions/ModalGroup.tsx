
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
  enumToFormatSelected,
  enumToFormatSelectOptions,
} from "utility/helper/enum";
import { notifyError, notifySuccess } from "utility/notify";
import { UserI } from "../../../columns";
import { IGroup } from "../columns";
import { GroupEnum } from "api/group/enum/group.enum";
import { createGroup } from "api/group/createGroup";
import { updateGroup } from "api/group/updateGroup";
import { deleteGroup } from "api/group/deleteGroup";

interface IModalGroupProps {
  user: UserI;
  row: IGroup | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  action: ACTION_ENUM;
  onHandle: Function;
}
const ModalGroup = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  user,
  action,
  onHandle,
}: IModalGroupProps) => {
  const [name, setName] = useState<string>();
  const [secretKey, setSecretKey] = useState<string>("");
  const [secretName, setSecretName] = useState<string>("");
  const [groupType, setGroupType] = useState<GroupEnum>(GroupEnum.NONE);
  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  useEffect(() => {
    if (row) {
      setName(row.name);
      setSecretKey(row.secretKey ?? "");
      setSecretName(row.secretName ?? "");
      setGroupType(row.groupType);
    }
  }, [row]);
  useEffect(() => {
    if (action === ACTION_ENUM.Delete)
      setStyleAction({ pointerEvents: "none", opacity: "0.7" });
  }, [action]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeSecretKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setSecretKey(e.target.value);
    }
  };
  const onChangeSecretName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e?.target) {
      setSecretName(e.target.value);
    }
  };

  const onChangeGroupType = (e) => {
    if (e) {
      setGroupType(e.value);
    }
  };


  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      switch (action) {
        case ACTION_ENUM.Create:
          const group = await createGroup({
              name,
              secretKey,
              secretName,
              groupType,
              userId: user.id,
            
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(group.data.createOneGroupDto);

          break;
        case ACTION_ENUM.Edit:
          const update = await updateGroup({
              id: row?.id,
              name,
              secretKey,
              secretName,
              groupType,
              userId: user.id,
            
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(update.data.updateOneGroupDto);

          break;
        case ACTION_ENUM.Delete:
          const destroy = await deleteGroup({
            variables: {
              id: row?.id,
            },
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(destroy.data.deleteOneGroupDto);

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
              <Label className="form-label" for="setIsOpenModalGroup-name">
                Name
              </Label>
              <Input
                defaultValue={name}
                type="text"
                id="setIsOpenModalGroup-name"
                placeholder="johndoe"
                autoFocus
                onChange={onChangeName}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label">Basic</Label>
              <ReactSelect
                defaultValue={enumToFormatSelected(GroupEnum, groupType)}
                className="react-select"
                options={enumToFormatSelectOptions(GroupEnum)}
                isClearable={false}
                onChange={(e) => onChangeGroupType(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-secret-key">
                Secret Key
              </Label>
              <Input
                defaultValue={secretKey}
                type="text"
                id="register-secret-key"
                placeholder="secret key ..."
                onChange={(e) => onChangeSecretKey(e)}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-secret-key">
                Secret Name
              </Label>
              <Input
                defaultValue={secretName}
                type="text"
                id="register-secret-key"
                placeholder="secret key ..."
                onChange={(e) => onChangeSecretName(e)}
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

export default ModalGroup;
