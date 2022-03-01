import React from 'react';
import { connect } from 'react-redux';

// import reducer
interface _CSVText {
    dispatch?   : any,
    next        : string,
}

export class AddCSVText
    extends React.Component<_CSVText, {}>
{
    render() {

        return (
            <div className="container">
                <div className="form-group row">
                    <div
                        id="csvdragtarget" className="dragTest center"
                        onDragOver={(e) => this.onDragStart(e)}
                        onDrop={(e) => this.onDragEnd(e)}>
                            <p>CSVをドラッグ</p>
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
            target  : 'csvdragtarget',
        })
    }

    private onDragEnd(e: any): void
    {
        const _e = e as Event;
        _e.preventDefault();
        
        this.props.dispatch({
            type    : 'DragAction/DragEndCSV',
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
)(AddCSVText)
