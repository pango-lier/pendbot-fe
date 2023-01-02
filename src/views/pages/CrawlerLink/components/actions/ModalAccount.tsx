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

import { ICrawlerLink } from "api/crawler/crawler-link/type/crawler-link.interface";
import { deleteCrawlerLink } from "api/crawler/crawler-link/delete";
import { updateCrawlerLink } from "api/crawler/crawler-link/update";
import { createCrawlerLink } from "api/crawler/crawler-link/create";
import { CrawlerLinkEnum } from "api/crawler/crawler-link/enum/crawler-link.enum";
import {
  enumToFormatSelectOptions,
  enumToFormatSelected,
} from "utility/helper/enum";

interface IGroupSelect {
  value: number;
  label: string;
  id: number;
}

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
}: IModalIAccountProps<ICrawlerLink>) => {
  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  const [type, setType] = useState<CrawlerLinkEnum>(CrawlerLinkEnum.None);
  const [data, setData] = useState<ICrawlerLink>();
  useEffect(() => {
    // fetchGroups();
    if (row) {
      setData(row);
      setType(row?.type || CrawlerLinkEnum.None);
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
    console.log(e);
    setType(e.value);
    setData({ ...data, type: e.value });
  };
  const onAccept: React.FormEventHandler<HTMLButtonElement> = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    switch (action) {
      case ACTION_ENUM.Create:
        if (!data?.name) return;
        const account = await createCrawlerLink({
          name: data?.name,
          description: data.description,
          type: data.type,
          target: data.target,
          socialId: data.socialId,
          accountId: data.accountId,
        });
        setIsOpenModalGroup(!isOpenModalGroup);
        console.log(account);
        onHandleModal(account.data);
        break;
      case ACTION_ENUM.Edit:
        if (!data?.name) return;
        if (row?.id) {
          const update = await updateCrawlerLink(+row?.id, {
            name: data?.name,
            description: data.description,
            type: data.type,
            target: data.target,
            socialId: data.socialId,
            accountId: data.accountId,
          });
          setIsOpenModalGroup(!isOpenModalGroup);

          onHandleModal(update.data);
        }
        break;
      case ACTION_ENUM.Delete:
        if (row?.id) {
          await deleteCrawlerLink(+row.id);
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
              <Label className="form-label" for="register-type">
                Crawler Link Type
              </Label>
              <ReactSelect
                id="register-type"
                value={enumToFormatSelected(CrawlerLinkEnum, type)}
                className="react-select"
                options={enumToFormatSelectOptions(CrawlerLinkEnum)}
                onChange={(e) => onChangeType(e)}
                isClearable={true}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="register-target">
                Target
              </Label>
              <Input
                value={data?.target || ""}
                type="text"
                id="register-target"
                placeholder="target"
                autoFocus
                onChange={(e) => onChangeName(e, "target")}
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
