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

import { IRowChild } from "../columns";
import { IRow } from "../../../columns";
import { updateSocialTarget } from "api/socialTargets/update";
import { deleteSocialTarget } from "api/socialTargets/delete";
import { createSocialTarget } from "api/socialTargets/create";
import { SocialTargetEnum } from "api/socialTargets/enum/type.enum";

interface IModalGroupProps {
  parent: IRow;
  row: IRowChild | undefined;
  isOpenModalGroup: boolean;
  setIsOpenModalGroup: Function;
  action: ACTION_ENUM;
  onHandle: Function;
}
const ModalGroup = ({
  isOpenModalGroup,
  setIsOpenModalGroup,
  row,
  parent,
  action,
  onHandle,
}: IModalGroupProps) => {
  const [type, setType] = useState<SocialTargetEnum>(SocialTargetEnum.Personal);

  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  const [data, setData] = useState<IRowChild | undefined>();
  useEffect(() => {
    // fetchGroups();
    if (row) {
      setData(row);
      setType(row?.targetType || SocialTargetEnum.Personal);
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
    setData({ ...data, targetType: e.value });
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
          if (!data) return;
          const group = await createSocialTarget({
            name: data?.name || "",
            targetType: data?.targetType,
            link: data?.link,
            social: { id: parent.id },
          });
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(group.data);

          break;
        case ACTION_ENUM.Edit:
          if (!row?.id) return;
          if (!data) return;
          const update = await updateSocialTarget(row?.id, data);
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle(update.data);

          break;
        case ACTION_ENUM.Delete:
          if (!row?.id) return;
          const destroy = await deleteSocialTarget(row?.id);
          setIsOpenModalGroup(!isOpenModalGroup);
          onHandle({ id: row?.id });

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
                value={enumToFormatSelected(SocialTargetEnum, type)}
                className="react-select"
                options={enumToFormatSelectOptions(SocialTargetEnum)}
                onChange={(e) => onChangeType(e)}
                isClearable={true}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="setIsOpenModalGroup-name">
                Name
              </Label>
              <Input
                defaultValue={data?.name}
                type="text"
                id="setIsOpenModalGroup-name"
                placeholder="johndoe"
                autoFocus
                onChange={(e) => onChangeName(e, "name")}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="setIsOpenModalGroup-link">
                Link *
              </Label>
              <Input
                defaultValue={data?.link}
                type="text"
                id="setIsOpenModalGroup-link"
                placeholder="url ..."
                autoFocus
                onChange={(e) => onChangeName(e, "link")}
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
