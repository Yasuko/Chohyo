import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    ListTextPropsInterface, initialState
} from '../../reducers/_Text/ListText'
import { NewTextInterface } from '../../reducers/_Text/NewText';


const mapStateToProps = (state: any) => {
    return state;
}

export class EditText
    extends React.Component<ListTextPropsInterface, {}>
{
    render() {
        const lt = (this.props.ListText) ?
                    this.props.ListText : initialState;
        return (
            <div className="container">
                <Link to="/template/new" className="large_link">新規</Link>
                <div className="d-flex">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.buildTemplateList(lt) }
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
    private buildTemplateList(lt: any): any
    {
        if (lt === initialState) {
            return (<tr><td>登録なし</td></tr>)
        }
        const _lists = lt.map((val: NewTextInterface, key) => {
            console.log(val);
            return (
                <tr key={key}>
                    <td>
                        <tr>
                            <td>{val.text}</td>
                        </tr>
                        <tr>
                            <td>{val.font}</td>
                            <td>{val.size}</td>
                        </tr>
                        <tr>
                            <td>{val.x}</td>
                            <td>{val.y}</td>
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
                                                type    : 'TemplateAction/del',
                                                id      : key
                                            });
                                        }
                                }>削除</button>
                            </td>
                        </tr>
                    </td>
                </tr>
            );
        });
        return _lists;
    }
}

export default connect(
    mapStateToProps
)(EditText)
