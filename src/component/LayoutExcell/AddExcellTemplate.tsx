import React from 'react';
import { connect } from 'react-redux';

// import component

// import reducer
interface _Template {
    dispatch?   : any,
    next        : string,
}

export class AddExcellTemplate
    extends React.Component<_Template, {}>
{
    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <div
                        id="svgtarget" className="dragTest center"
                        onDragOver={(e) => this.onDragStart(e)}
                        onDrop={(e) => this.onDragEnd(e)}>
                            <p>Excellをドラッグ</p>
                    </div>
                </div>
            </div>
        );
    }

    private onDragStart(e: any): void
    {
        const _e = e as Event;
        _e.preventDefault();
        this.props.dispatch({
            type    : 'DragAction/DragStart',
            event   : _e,
            target  : 'svgtarget',
        })
    }

    private onDragEnd(e: any): void
    {
        const _e = e as Event;
        _e.preventDefault();
        
        this.props.dispatch({
            type    : 'DragAction/DragEnd',
            event   : _e,
            next    : this.props.next,
        });
        _e.stopPropagation();
    }
}

export default connect(
    (state: any) => {
        return state;
    }
)(AddExcellTemplate)
