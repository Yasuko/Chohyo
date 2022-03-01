import React from 'react';
import { connect } from 'react-redux';

// import reducer

import { TextInterface, listInitial, ListTextInterface } from '../../reducers/_Text/_text.Interface';
import { ListTextPropsInterface } from '../../reducers/_Text/ListText';
import { FontPropsInterface, initialState as initialFont } from '../../reducers/Font';


const mapStateToProps = (state: any) => {
    return state;
}

type ListTextProps = ListTextPropsInterface & FontPropsInterface;
export class ListText
    extends React.Component<ListTextProps, {}>
{
    render() {
        const lt: ListTextInterface = (this.props.ListText) ?
                    this.props.ListText : listInitial;
        return (
            <div className="d-flex">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.buildTextList(lt) }
                    </tbody>
                </table>
            </div>
        );
    }
    private buildTextList(lt: any): any
    {
        console.log()
        if (lt.texts[0] === listInitial.texts[0]) {
            return (<tr><td>Select Text</td></tr>)
        }
        const _lists = lt.texts.map((val: TextInterface, key) => {
            if (key === lt.spot) {
                return (
                    <tr key={key}>
                        <td>
                            <tr>
                                <td>
                                    <div className='d-flex'>
                                        <div className="my-box col TextTitle2">
                                            Text:
                                        </div>
                                        <div className="my-box col">
                                            <input
                                                className="form-control TextInputMiddle"
                                                type="text"
                                                defaultValue={val.text}
                                                onChange={(e) => {
                                                    this.updateProp(key, val, {text: e.target.value});
                                                }}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='d-flex'>
                                        <div className="my-box col TextTitle2">
                                            Name:
                                        </div>
                                        <div className="my-box col">
                                            <input
                                                type="text"
                                                defaultValue={val.name}
                                                className="TextInputMiddle form-control"
                                                onChange={(e) => {
                                                    this.updateProp(key, val, {name: e.target.value});
                                                }}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='d-flex'>
                                        <div className="my-box col TextTitle2">
                                            Font:
                                        </div>
                                        <div className="my-box col">
                                            {this.fontList(key, val)}
                                        </div>
                                        <div className="my-box col TextTitle2">
                                            Size:
                                        </div>
                                        <div className="my-box col">
                                            <input
                                                type="number"
                                                defaultValue={val.size}
                                                className="TextInputMin form-control"
                                                onChange={(e) => {
                                                    this.updateProp(key, val, {size: e.target.value});
                                                }}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='d-flex'>
                                        <div className="my-box col TextTitle2">
                                            x:
                                        </div>
                                        <div className="my-box col">
                                            <input
                                                type="number"
                                                value={val.x}
                                                className="TextInputMin form-control"
                                                onChange={(e) => {
                                                    this.updateProp(key, val, {x: e.target.value});
                                                }} />
                                        </div>
                                        <div className="my-box col TextTitle2">
                                            y:
                                        </div>
                                        <div className="my-box col">
                                            <input
                                                type="number"
                                                value={val.y}
                                                className="TextInputMin form-control"
                                                onChange={(e) => {
                                                    this.updateProp(key, val, {y: e.target.value});
                                                }} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        data-toggle="modal" data-target='#show_qr'
                                        onClick={
                                            () => {
                                                this.props.dispatch({
                                                    type    : 'ListText/delete',
                                                    key     : key
                                                });
                                            }
                                    }>削除</button>
                                </td>
                            </tr>
                        </td>
                    </tr>
                );
            }
        });
        return _lists;
    }

    private updateProp(key: number, val: any, change: any): void
    {
        this.props.dispatch({
            type    : 'ListText/update',
            text    : {
                ...val,
                ...change,
                ...{key: key}
            }
        });
    }

    private fontList(key: number, val: any): any
    {
        const f = (this.props.Font) ?
                    this.props.Font : initialFont;
        const _lists = f.map((val: any, k) => {
            return (
                <option value={val.name} key={k}>
                    {val.outstring}
                </option>
            );
        });
        return (
            <select
                className="form-control TextInputMin"
                defaultValue={val.font}
                onChange={(e) => {
                    this.props.dispatch({
                        type    : 'ListText/update',
                        text    : {
                            ...val,
                            ...{
                                font: e.target.value,
                                key: key
                            }
                        }
                    })
                }}>
                {_lists}
            </select>
        );
    }
}

export default connect(
    mapStateToProps
)(ListText)
