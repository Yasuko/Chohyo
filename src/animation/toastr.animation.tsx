import React from 'react';
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.css';
import './toastr.scss';

import { toastrAnimationPropsInterface } from './toastr.animation.reducer';

const mapStateToProps = (state: any) => {
    return state
}

/**
 * 
 * ModeList
 * 
 * success  : 成功
 * info     : 情報
 * warn     : 警告
 * error    : 失敗
 */
export class ToastrAnimation
    extends React.PureComponent<toastrAnimationPropsInterface, {}>
{
    private showIng = false;

    private transitionToastrStyles: any = {
        entering: {
            transition  : 'all .8s ease',
            display     : 'block',
            opacity     : 1,
        },
        entered: {
            transition  : '',
            opacity     : 1,
        },
        exiting: {
            transition  : 'all .10s ease',
            opacity     : 0,
        },
        exited: {
            transition  : 'all .10s ease',
            display     : 'none',
        }

    };
      
    private defaultToastrStyle = {
        transition      : `opacity 1000ms ease-in-out`,
        backgoundColor  : 'white',
        display         : 'block',
        opacity         : 1,
    }

    private close()
    {
        this.showIng = false;
        this.props.dispatch({
            type            : 'toastrAnimation/RESET',
        });
    }

    render()
    {
        let sh = false;
        let txt = '';
        let mode = '';
        if (this.props.toastrAnimation
            && this.props.toastrAnimation.Loading)
        {
            sh = this.props.toastrAnimation.Loading;
            txt = this.props.toastrAnimation.Text;
            mode = this.props.toastrAnimation.Mode;

            this.showIng = true;

            setTimeout(() => {
                this.close();
            }, 2000);
        };

        return (
            <Transition
                in={ sh }
                timeout={ 550 }
            >
            {(state) => (
                <div
                    className={'toastr toastr-' + mode}
                    style={{
                        ...this.defaultToastrStyle,
                        ...this.transitionToastrStyles[state],
                        }}>
                    <div
                        className="toastr-text"
                        >
                        { txt }
                    </div>
                    <div
                        className='toastr-close'
                        onClick={() => this.close()}>☓</div>
                </div>
            )}
            </Transition>
        );
    }
}

export default connect(
    mapStateToProps
)(ToastrAnimation)
