import React from 'react';
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.css';
import './loading.scss';

import { loadingAnimationPropsInterface, initialState } from './loading.animation.reducer';

const mapStateToProps = (state: any) => {
    return state;
}

const transitionStyles: any = {
    entering: {
        transition  : 'all .20s ease',
        display     : 'block',
        opacity     : 1,
    },
    entered: {
        transition  : '',
        opacity     : 1,
    },
    exiting: {
        transition  : 'all .20s ease',
        opacity     : 0,
    },
    exited: {
        transition  : '',
        display     : 'none',
    }
};
  
const defaultStyle = {
    transition      : `opacity 3000ms ease-in-out`,
    display         : 'block',
    top             : 0,
    left            : 0,
    width           : '100%',
    height          : '100%',
    position        : 'absolute',
    backgroundColor : 'rgba(150, 150, 150, 0.7)',
    zIndex          : 10000000,
    opacity         : 1,
}


export class LoadingAnimation
    extends React.Component<loadingAnimationPropsInterface, {}>
{
    private myRef: any = React.createRef();

    render()
    {
        const show = (this.props.loadingAnimation)?
                    this.props.loadingAnimation : initialState;
        return (
        <Transition
            in={ show.isLoading }
            timeout={550}
            >
            {(state) => (
                <div
                    ref={this.myRef}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                        }}
                    id="LoadingAnimation"
                    >
                    <div className="mx-auto" style={{width: '500px'}}>
                        <div  style={{marginTop: '50%'}}>
                            <div className="container">
                                <div
                                    className="spinner-grow text-dark loading-icon"
                                    role="status">
                                </div>
                            </div>
                            <div className="container">
                                <h3 className="blinking loading-icon">
                                    { show.message }
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
        );
    }
}

export default connect(
    mapStateToProps
)(LoadingAnimation)
