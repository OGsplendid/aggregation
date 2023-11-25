import React from "react";
import { MonthTable } from "../MonthTable/MonthTable";
import { IList } from "../../modules";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function commonHOC(Component: any) {

    return class extends React.Component<IList, IList> {
        constructor(props: IList) {
            super(props);
            this.state = {
                list: [...this.props.list],
            };
        }

        componentDidMount(): void {
            console.log(this, this.props)
        }

        render() {
            console.log(this.state.list)
            return (
                <Component {...this.state} />
            )
        }
    }
}

export const MonthTableHOC = commonHOC(MonthTable);
