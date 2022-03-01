import React from 'react';
import { connect } from 'react-redux';

// import component
import ListText     from '../Text/ListText';
import ShowText     from '../Text/ShowText';
import AddCSVText   from '../Text/AddCSVText';
import AddTemplate  from '../Template/AddTemplate';
import AddSpecTemplate from '../Template/AddSpecTemplate';
import AddImage     from '../Image/AddImage';

// import reducer
import {
    NewLayoutPropsInterface, initialState
} from '../../reducers/_Layout/NewLayout'

interface LayoutPropsInterface extends NewLayoutPropsInterface
{
    key?    :number
}

export class Newlayout
    extends React.Component<LayoutPropsInterface, {}>
{
    private tabCounter: number = 3;

    render() {
        const nl = (this.props.NewLayout) ?
                    this.props.NewLayout : initialState;
        if (nl.done){
            window.location.href = nl.back;
        }
        return (
            <div className="container">
                <nav className="navbar">
                    <h6>New Layout</h6>
                    <div className="ToolBox">

                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-toggle="modal" data-target='#show_qr'
                        onClick={
                            () => {
                                this.props.dispatch({
                                    type    : 'LayoutAction/save',
                                });
                            }
                    }>PDF作成</button>
                </nav>
                <div className="LayoutBase">
                    <ShowText />
                </div>
                <div className="LayoutSub">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a
                                className="nav-link active" id="item1-tab" href="#item1"
                                onClick={() => {this.tabChange(1)}}>テキスト</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link" id="item2-tab" href="#item2"
                                onClick={() => {this.tabChange(2)}}>SVG</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link" id="item3-tab" href="#item3"
                                onClick={() => {this.tabChange(3)}}>画像</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="item1">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                data-toggle="modal" data-target='#show_qr'
                                onClick={
                                    () => {
                                        this.props.dispatch({
                                            type    : 'TextAction/add',
                                        });
                                    }
                            }>ADD</button>
                            <div className="container">
                                <div className="container LayoutTexts">
                                    <ListText />
                                </div>
                                <br></br>
                                <br></br>
                                <div className="container LayoutTexts">
                                    CSV読み込み
                                    <AddCSVText next="LayoutAction/exchangeCSVText" />
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="item2">
                            <div className="container LayoutTemplate">
                                <AddTemplate next="LayoutAction/changeTemplate" />
                            </div>
                            <div className="container LayoutTemplate">
                                <AddSpecTemplate
                                    next="LayoutAction/changePaperSpec"
                                    paper="A4"
                                    orientation="portrait" />
                            </div>
                        </div>
                        <div className="tab-pane fade" id="item3">
                            <div className="container LayoutTemplate">
                                <AddImage next="" />
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

    private tabChange(tab: number): void
    {
        for (let i = 1; i <= this.tabCounter; i++) {
            const e = document.getElementById('item' + i + '-tab') as HTMLAnchorElement;
            const e_b = document.getElementById('item' + i) as HTMLDivElement;
            e.classList.remove('active');
            e_b.classList.remove('show', 'active');
            if (tab === i) {
                e.classList.add('active');
                e_b.classList.add('show', 'active');
            }
        }
    }

}

export default connect(
    (state: any) => {
        return state;
    }
)(Newlayout)
