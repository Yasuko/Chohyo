import React from 'react';
import { connect } from 'react-redux';
import * as Excel from 'exceljs';


// import component
import AddCSVText from '../Text/AddCSVText';
import AddExcellTemplate from './AddExcellTemplate';

// import reducer
import {
    ExcellLayoutPropsInterface, initialState
} from '../../reducers/_Layout/ExcellLayout'


export class NewlayoutExcell
    extends React.Component<ExcellLayoutPropsInterface, {}>
{
    private tabCounter: number = 2;

    private nl: any;

    private initialJob(): void {
        this.nl = (this.props.ExcellLayout) ?
                    this.props.ExcellLayout : initialState;

        if (this.nl.done){
            window.location.href = this.nl.back;
        }
    }

    render() {
        this.initialJob();
        return (
            <div className="container">
                <nav className="navbar">
                    <h6>ExcellLayout</h6>
                    <div className="ToolBox">
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            data-toggle="modal" data-target='#show_qr'
                            onClick={
                                () => {
                                    this.props.dispatch({
                                        type    : 'NewPrint/set',
                                        layout  : this.nl
                                    });
                                    this.props.dispatch({
                                        type    : 'PrintAction/export',
                                    });
                                }
                        }>Excell出力</button>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            data-toggle="modal" data-target='#show_qr'
                            onClick={
                                () => {
                                    this.props.dispatch({
                                        type    : 'NewPrint/set',
                                        layout  : this.nl
                                    });
                                    this.props.dispatch({
                                        type    : 'PrintAction/export',
                                    });
                                }
                        }>変数一覧出力</button>
                    </div>
                </nav>
                <div className="container">
                    { this.showTexts() }
                </div>
                <div className="LayoutSub">
                    <AddExcellTemplate next="LayoutAction/changeExcellTemplate" />
                    <br></br>
                    <AddCSVText next="LayoutAction/atachCSV" />
                </div>
            </div>
        );
    }

    private showTexts(): any
    {
        if (this.nl.texts.length <= 1 ) {
            return (<tr><td>登録なし</td></tr>)
        }
        const _lists = Object.keys(this.nl.texts).map((val: any, key) => {
            return (
                <div key={key} className='d-flex'>
                    <div className="my-box col TextTitle2">
                        {val}
                    </div>
                    <div className="my-box col">
                        <input
                            className="form-control TextInputMiddle"
                            type="text"
                            defaultValue={this.nl.texts[val]}
                            onChange={(e) => {
                                this.props.dispatch({
                                    type    : 'ExcellLayout/updateContents',
                                    key     : key,
                                    content : e.target.value
                                });
                            }}/>
                    </div>
                    <br></br>
                </div>
            );
        });
        return _lists;
    }
}

export default connect(
    (state: any) => {
        return state;
    }
)(NewlayoutExcell)
