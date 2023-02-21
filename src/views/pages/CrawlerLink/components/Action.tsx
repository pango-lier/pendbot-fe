
import { runQueueService } from "api/crawler/run-queues";

import { Edit, MoreVertical, Navigation, Trash } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { ButtonTooltip } from "views/pages/components/ButtonTooltip";
import { CrawlerLinkEnum } from "../../../../api/crawler/crawler/enum/crawler-link.enum";

const Action = ({ row, onEditHandle, onDeleteHandle }: any) => {
  const onRunCommandService = async () => {
    let commands: any = 'crawlerYoutubeNormal';
    if (row.type === CrawlerLinkEnum.Auto) commands = 'crawlerYoutubeShortAuto';
    await await runQueueService({
      commands,
      crawlerLinkIds: [row.id]
    });
  };

  return (
    <>
      <div className="d-flex justify-content-around align-content-between flex-nowrap">
        <ButtonTooltip
          message="Run crawler"
          id={`run-crawler-${row.id}`}
          onHandle={() => onRunCommandService()}
          icon={<Navigation size={12} />}
          color="primary"
        ></ButtonTooltip>
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu container={"body"}>
            <DropdownItem href="#" onClick={() => onRunCommandService()}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">Run Test </span>
            </DropdownItem>
            <DropdownItem href="#" onClick={() => onEditHandle(row)}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem href="#" onClick={() => onDeleteHandle(row)}>
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default Action;
