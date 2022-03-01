import React from 'react';
import { connect } from 'react-redux';

// import reducer
import {
    NewPrintPropsInterface, initialState
} from '../../reducers/_Print/NewPrint';

import { NewTextInterface } from '../../reducers/_Text/NewText';

interface PrintPropsInterface extends NewPrintPropsInterface {}

export class NewPrint
    extends React.Component<PrintPropsInterface, {}>
{
    render() {
        const np = (this.props.NewPrint) ?
                    this.props.NewPrint : initialState;
        
        return (
            <div className="container">
                <div className="d-flex">
                    <div className="my-box w-75">
                        <svg
                            width={ np.width * 4 }
                            height={ np.height * 4 }
                            viewBox={'0 0 ' + np.width * 1.2 + ' ' + np.height * 1.2 }
                        >
                            <image
                                x="0" y="0"
                                width={ np.width }
                                height={ np.height }
                                href={ np.svg }
                            ></image>
                            { this.mappingImage(np.images) }
                            { this.mappingText(np.texts) }

                        </svg>
                    </div>

                    <br></br>
                    <div className="my-box w-25">
                        <div className="container">
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={
                                    () => this.props.dispatch({
                                        type    : 'PrintAction/print',
                                        // type    : 'PrintAction/printer',
                                    })
                                }>
                                PDF作成</button>
                            <p></p>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={
                                    () => this.props.dispatch({
                                        type    : 'PrintAction/loadData',
                                    })
                                }>
                                データ読み込み</button>
                        </div>
                        <br></br>
                        <table>
                            <tbody>
                                { this.buildTextList(np.texts) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    private mappingText(text: any): JSX.Element
    {
        if (text.length <= 1) {
            return (<p></p>);
        }
        const _lists: JSX.Element = text.map((val: NewTextInterface, key) => {
            return (
                <text key={ key }
                    x={val.x}
                    y={val.y}
                    fontSize={val.size}
                    fontFamily={val.font}
                    stroke="black"
                    textAnchor="Super Sans"
                    strokeWidth="0.3"
                >
                    {val.text}
                </text>
            );
        });
        return _lists;
    }

    private mappingImage(im: any): JSX.Element
    {
        if (im[0].image === '') {
            return (<p></p>);
        }
        const _lists: JSX.Element = im.map((val: any, key) => {
            return (
                <image
                    key={key}
                    x={ val.x } y={ val.y }
                    width={ val.width + 'px' }
                    height={ val.height + 'px' }
                    href={ val.image }
                ></image>
            );
        });
        return _lists;
    }
    private buildTextList(lt: any): JSX.Element
    {
        if (lt === initialState) {
            return (<tr><td>登録なし</td></tr>)
        }
        const _lists: JSX.Element = lt.map((val: NewTextInterface, key) => {
            return (
                <tr key={key}>
                    <td className="TextTitle">
                        Text : 
                        <input
                            className="form-control TextInputLarge"
                            type="text"
                            value={val.text}
                            onChange={(e) => {
                                this.props.dispatch({
                                    type    : 'NewPrint/updateText',
                                    key     : Number(key),
                                    text    : e.target.value,
                                })
                            }}
                        />
                    </td>
                </tr>
            );
        });
        return _lists;
    }

    private updateProp(key: number, text: string): void
    {
        this.props.dispatch({
            type    : 'NewPrint/updateText',
            text    : {
                key     : key,
                text    : text,
            }
        });
    }
}

export default connect(
    (state: any) => {
        return state;
    }
)(NewPrint)
