import React from "react";
import { Badge, UncontrolledTooltip } from "reactstrap";
import copyText from "utility/helper/copyText";

export interface IChipTooltip {
    message: string;
    id: string;
    status?: string;
}

export const ChipTooltip: React.FC<IChipTooltip> = (props) => {
    const { message, id, status } = props;
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        if (document.getElementById(id)) {
            setReady(true);
        }
    }, [document.getElementById(id)]);

    const color = () => {
        if (status === 'pending') return 'primary';
        if (status === 'warning') return 'warning';
        if (status === 'success') return 'success';
        if (status === 'processing') return 'info';
        if (status === 'error') return 'danger';

        return undefined;
    }
    return (
        <>
            <div className="cursor-pointer" onClick={() => copyText(message ? message : status)} id={id}>
                <Badge color={color()}>
                    {status}
                </Badge>

            </div>
            {ready && (
                <UncontrolledTooltip placement="left" target={id}>
                    {message ? message : status}
                </UncontrolledTooltip>
            )}
        </>
    );
};
