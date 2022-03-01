import React from 'react';
import { connect } from 'react-redux';

// import component
import SelectPaperSize from '../_helper/SelectPaperSize';
import SelectPintOrientation from '../_helper/SelectPintOrientation';

// import reducer
interface _Template {
    dispatch?   : any,
    paper?      : string,
    orientation?: 'landscape' | 'portrait',
    next        : string,
}

export class AddSpecTemplate
    extends React.Component<_Template, {}>
{
    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <SelectPaperSize
                        next={this.props.next}
                        selected={this.props.paper}
                    />
                </div>
                <br></br>
                <div className="form-group row">
                    <SelectPintOrientation
                        next={this.props.next}
                        selected={this.props.orientation}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => {
        return state;
    }
)(AddSpecTemplate)
