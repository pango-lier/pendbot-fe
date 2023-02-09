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
import { GroupEnum } from "api/group/enum/group.enum";
import { createGroup } from "api/group/createGroup";
import { updateGroup } from "api/group/updateGroup";
import { deleteGroup } from "api/group/deleteGroup";

interface IModalGroupProps {
  child: any;
  row: any;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  action: ACTION_ENUM;
  onHandle: Function;
}
const ModalGroup = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  child,
  action,
  onHandle,
}: IModalGroupProps) => {
  const [name, setName] = useState<string>();
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
    setName(e.target.value);
  };

  const onChangeGroupType = (e) => {
    if (e) {
    }
  };

  const create: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    try {
      switch (action) {
        case ACTION_ENUM.Create:
          // const group = await createGroup({
          //   name,
          //   userId: user.id,
          // });
          // setIsOpenModalGroup(!isOpenModalGroup);
          // onHandle(group.data.createOneGroupDto);

          break;
        case ACTION_ENUM.Edit:
          const update = await updateGroup({
            id: row?.id,
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
              {/* <ReactSelect
                defaultValue={enumToFormatSelected(GroupEnum, groupType)}
                className="react-select"
                options={enumToFormatSelectOptions(GroupEnum)}
                isClearable={false}
                onChange={(e) => onChangeGroupType(e)}
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

export default ModalGroup;
