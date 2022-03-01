import React from 'react';
import { connect } from 'react-redux';

interface Image {
    dispatch?   : any;
    next        : string;
}

export class AddImage
    extends React.Component<Image, {}>
{
    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <div
                        id="dragimage" className="dragTest center"
                        onDragOver={(e) => this.onDragStart(e)}
                        onDrop={(e) => this.onDragEnd(e)}
                    >
                        画像をドラッグ
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
        })
    }

    private onDragEnd(e: any): void
    {
        const _e = e as Event;
        _e.preventDefault();
        
        this.props.dispatch({
            type    : 'DragAction/DragEndImage',
            event   : _e,
            next    : 'TextAction/addImage',
        });
        _e.stopPropagation();
    }
}

export default connect(
    (state: any) => {
        return state;
    }
)(AddImage)
