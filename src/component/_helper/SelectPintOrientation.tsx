import React from "react";
import { connect } from 'react-redux';

interface PrintOrientation {
    dispatch?   : any,
    selected?   : 'landscape' | 'portrait',
    next        : string,
}

export class SelectPrintOrientation extends React.Component<PrintOrientation, {}>{
    render() {
        let select = [false, false];
        if (this.props.selected !== undefined) {
            select = (this.props.selected === 'portrait') ? [ true, false ] : [false, true];
        } 

        return (
            <div>
                <label
                    htmlFor="paper-size">印刷向き:</label>
                <div className="container-fluid">
                    <div className="row">
                        <div className="form-check form-check-inline col">
                            <input type="radio"
                                className="form-check-input"
                                name="rotate"
                                id="custom-radio-1a"
                                defaultChecked={select[0]}
                                onClick={
                                    () => this.props.dispatch({
                                        type        : this.props.next,
                                        orientation : 'portrait',
                                    })
                                }
                            />
                            <label className="form-check-label" htmlFor="custom-radio-1a">　縦向き</label>
                        </div>
                        <div className="form-check form-check-inline col">
                            <input type="radio"
                                className="form-check-input"
                                name="rotate"
                                id="custom-radio-1b"
                                defaultChecked={select[1]}
                                onClick={
                                    () => this.props.dispatch({
                                        type    : this.props.next,
                                        orientation   : 'landscape',
                                    })
                                }
                            />
                            <label className="form-check-label" htmlFor="custom-radio-1b">　横向き</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    (state: any) => {
        return state;
    }
)(SelectPrintOrientation)
