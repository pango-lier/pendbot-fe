import { deleteSocial } from "api/socials/delete";
import { findAllRawSocialTarget } from "api/socialTargets/findAllRaw";
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

interface IModalGroupProps {
  rows: any;
  isOpen: boolean;
  setIsOpen: Function;
  onHandle: Function;
}
interface IOptions {
  value: number;
  label: string;
}
const PushToSocials = ({
  isOpen,
  setIsOpen,
  rows,
  onHandle,
}: IModalGroupProps) => {
  const [styleAction, setStyleAction] = useState<
    React.CSSProperties | undefined
  >();
  const [socials, setSocials] = useState<IOptions[]>([]);
  const [socialSelected, setSocialSelected] = useState<any>();

  useEffect(() => {
    fetchSocialOptions();
  }, []);
  const fetchSocialOptions = async () => {
    const res = await findAllRawSocialTarget();
    const options = res.data.map((i) => {
      return {
        id: i.id,
        value: i.id,
        label: i.name,
      };
    });
    setSocials(options);
  };

  return (
    <div>
      <Modal size="lg" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          {`Push to socials`}
        </ModalHeader>
        <ModalBody>
          <Form className="push-to-socials-form mt-2" style={styleAction}>
            <div className="row">
              <div className="mb-1">
                <Label className="form-label" for="register-social">
                  Socials Target
                </Label>
                <ReactSelect
                  id="register-social"
                  value={socialSelected}
                  className="react-select"
                  options={socials}
                  onChange={(e) => {
                    setSocialSelected(e);
                  }}
                  isClearable={true}
                  isMulti={true}
                />
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onHandle(socialSelected)}>
            Publish
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

//ModalGroup.propTypes = {};

export default PushToSocials;
