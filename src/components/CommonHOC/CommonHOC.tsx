import React from "react";
import { MonthTable } from "../MonthTable/MonthTable";
import { TListItem } from "../../modules";

interface Props {
    list: TListItem[];
    mapper: (list: TListItem[]) => TListItem[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function commonHOC(Component: any) {
    return class extends React.Component<Props> {
        render() {
            return (
                <Component list={this.props.mapper(this.props.list)} />
            )
        }
    }
}

export default commonHOC
