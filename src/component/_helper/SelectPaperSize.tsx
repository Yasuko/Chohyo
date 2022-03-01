import React from "react";
import { connect } from 'react-redux';

interface PaperSize {
    dispatch?   : any,
    next        : string,
    selected?   : string,
}

export class SelectPaperSize extends React.Component<PaperSize, {}>{
    render() {
        let key = 0;
        return (
            <div className="container">
                <label
                    htmlFor="paper-size"
                    >用紙サイズ:</label>
                <div className="container-fluid">
                        <div className="row">
                    {['A3', 'A4', 'A5', 'B3', 'B4', 'B5'].map((value) => {
                        const selected = (this.props.selected
                                                && this.props.selected === value
                                            ) ? true : false;
                        key++;
                                        
                        return <div className="form-check form-check-inline col" key={key}>
                            <input type="radio"
                                className="form-check-input"
                                name="paper-size"
                                defaultChecked={selected}
                                id={"custom-radio-1" + value}
                                onClick={
                                    () => this.props.dispatch({
                                        type    : this.props.next,
                                        paper   : value,
                                    })
                                }
                            />
                            <label className="form-check-label"
                                htmlFor={"custom-radio-1" + value}>  {value}</label>
                        </div>
                    })}
                        </div>
                    </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return state;
}
export default connect(
    mapStateToProps
)(SelectPaperSize)
