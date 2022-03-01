import React from 'react';
import { connect } from 'react-redux';

// import reducer
import {
    ListTextPropsInterface, initialState as textInitial
} from '../../reducers/_Text/ListText'
import {
    NewTextInterface
} from '../../reducers/_Text/NewText';
import {
    ActiveLayoutPropsInterface, initialState as activeInitial
} from '../../reducers/_Layout/ActiveLayout';
import {
    LayoutImagePropsInterface,
    LayoutImageInterface,
    initialState as imageInitial,
} from '../../reducers/_Image/LayoutImage';


type TextPropsInterface =
    ActiveLayoutPropsInterface
    & ListTextPropsInterface
    & LayoutImagePropsInterface;

export class ShowText
    extends React.Component<TextPropsInterface, {}>
{
    private flags       : Object    = {
        screen: false, text: false, image: false, resize: false
    }

    private constRate   : number    = 4; // 表示倍率固定レート

    private editMode    : boolean   = false;

    private lt          : any       = {};   // テキストコンテンツ
    private al          : any       = {};   // 背景テンプレート
    private li          : any       = {};   // 画像コンテンツ
    
    private editTarget  : any       = {};   // 編集対象

    private key         : number    = 0;    // 移動中コンテンツのIndex番号
    private baseX       : number    = 0;    // 移動中コンテンツの元のX座標
    private baseY       : number    = 0;    // 移動中コンテンツの元のY座標
    private screenX     : number    = 0;    // 背景テンプレートのX座標
    private screenY     : number    = 0;    // 背景テンプレートのY座標

    private viewBox     : string    = '';   // SVG描画エリアの表示エリア

    private initial(): void
    {
        this.lt = (this.props.ListText) ?
                    this.props.ListText : textInitial;
        this.al = (this.props.ActiveLayout) ?
                    this.props.ActiveLayout : activeInitial;
        this.li = (this.props.LayoutImage) ?
                    this.props.LayoutImage : imageInitial;
        
    }

    render() {
        this.initial();
        this.viewBox = this.calcViewBox();
        // this.insertSVGTemplate();
        return (
            <div
                className="LayoutScreen"
                style={{
                    width: this.al.width + 'px',
                    height: this.al.height + 'px',
                }}>
                

                <svg
                    width={ this.al.width * this.constRate }
                    height={ this.al.height * this.constRate }
                    viewBox={ this.viewBox }
                    onMouseMove={(e) => {
                        this.movePosition(e)
                    }}
                    onMouseUp={(e) => {
                        this.moveEnd();
                    }}
                    onWheel={(e) => {
                        if ( this.al.rate > 0 && this.al.rate < 10 ) {
                            this.props.dispatch({
                                type    : 'ActiveLayout/setRate',
                                rate    : this.al.rate + (e.deltaY / 1000)
                            });
                        }
                    }}
                >
                    <image
                        x="0" y="0"
                        width={ this.al.width }
                        height={ this.al.height }
                        href={this.al.svg}
                        onMouseDown={(e) => {
                            this.moveOn(e, this.al, 0, 'screen');
                        }}
                    ></image>

                    { this.mappingImage() }
                    { this.mappingText() }
                    { 
                        (this.editMode) ? this.showEditMode() : (<p></p>)
                    }
                </svg>
            </div>

        );
    }

    private insertSVGTemplate(): void
    {
        const target: any = document.getElementById('active_layout');
        if (target !== null) {
            const h = this.al.svg.split('base64,');

            target.innerHTML = decodeURIComponent(escape(atob(h[1])));
        }
    }

    /**
     * 編集モード用の要素を表示
     * @returns JSX.Element
     */
    private showEditMode(): JSX.Element
    {
        const map: any = [[0,1], [2, 1], [2, 3], [0, 3]];
        const point: number[] = [0,0,0,0];
        point[0] = this.li[this.key].x - 2.5;
        point[1] = this.li[this.key].y - 2.5;
        point[2] = this.li[this.key].x + this.li[this.key].width - 2.5;
        point[3] = this.li[this.key].y + this.li[this.key].height - 2.5;

        const _lists: JSX.Element = map.map((val: number[], key) => {
            return (
                <path
                    d={"M " + point[val[0]] + " " + point[val[1]] + " h 5 v 5 h -5 v -5"}
                    stroke="white" stroke-width="1"
                    fill="gray" className="ImagePointer"
                    onMouseDown={(e: any) => { this.moveOn(e, val, key, 'resize') }}
                />
            );
        });
        return _lists;
    }

    private mappingText(): JSX.Element
    {
        if (this.lt.texts[0] === textInitial.texts[0]) {
            return (<p></p>);
        }
        const _lists: JSX.Element = this.lt.texts.map((val: NewTextInterface, key) => {
            return (
                <text key={ key }
                    x={val.x}
                    y={val.y}
                    fontSize={val.size}
                    fontFamily={val.font}
                    stroke="black"
                    textAnchor="Super Sans"
                    strokeWidth="0.3"
                    onMouseDown={(e) => {
                        this.moveOn(e, val, key, 'text');
                    }}
                >
                    {val.text}
                </text>
            );
        });
        return _lists;
    }

    private mappingImage(): JSX.Element
    {
        if (this.li === imageInitial) {
            return (<p></p>);
        }
        const _lists: JSX.Element = this.li.map((val: LayoutImageInterface, key) => {
            return (
                <image
                    key={key}
                    x={val.x} y={val.y}
                    width={ val.width  + 'px' }
                    height={ val.height + 'px' }
                    href={val.image}
                    onMouseDown={(e) => {
                        this.moveOn(e, val, key, 'image');
                    }}
                ></image>
            );
        });
        return _lists;
    }

    private moveOn(e: React.MouseEvent, content: any, key: number, type: string): void
    {
        e.preventDefault();
        if (type !== 'resize' && type !== 'screen') {
            this.editTarget = content;
            this.key        = key;
        }
        if (type === 'resize') {
            this.editTarget = this.li[this.key];
            this.editMode   = true;
        }
        if (type === 'screen') {
            this.screenX = content.x;
            this.screenY = content.y;
            this.editMode   = false;
            this.editTarget = {};
        }
        if (type === 'image') {
            this.editMode = true;
        }
        if (type === 'text') {
            this.editMode   = false;
            this.setTextTarget(key);
        }

        this.baseX      = e.pageX;
        this.baseY      = e.pageY;

        if (type === 'image') this.setFlag('image', true);
        if (type === 'text')  this.setFlag('text', true);
        if (type === 'resize')  this.setFlag('resize', true);
        if (type === 'screen')  this.setFlag('screen', true);
    }


    private moveEnd(): void
    {
        if (this.checkFlag('resize')) {
            this.setFlag('resize', false);
            return;
        }
        if (this.checkFlag('screen')) {
            this.screenX = 0;
            this.screenY = 0;
        }

        this.baseX      = 0;
        this.baseY      = 0;
        this.key        = 0;
        this.setFlag('screen', false);
        this.setFlag('text', false);
        this.setFlag('image', false);
    }

    private movePosition(e: React.MouseEvent): any
    {
        if (this.checkFlag('resize')) {
            const w = this.editTarget['width'] + this.roundCalc(e.pageX - this.baseX);
            this.props.dispatch({
                type    : 'LayoutImage/update',
                image    : {
                    ...this.editTarget,
                    ...{
                        key : this.key,
                        width   : w,
                        height  : w * (this.editTarget['width'] / this.editTarget['height']),
                    }
                }
            });
        }
        if (this.checkFlag('text')) {
            this.props.dispatch({
                type    : 'ListText/update',
                text    : {
                    ...this.editTarget,
                    ...{
                        key : this.key,
                        x   : this.editTarget['x'] + this.roundCalc(e.pageX - this.baseX),
                        y   : this.editTarget['y'] + this.roundCalc(e.pageY - this.baseY)
                    }
                }
            });
        }
        if (this.checkFlag('image')) {
            this.props.dispatch({
                type    : 'LayoutImage/update',
                image    : {
                    ...this.editTarget,
                    ...{
                        key : this.key,
                        x   : this.editTarget['x'] + this.roundCalc(e.pageX - this.baseX),
                        y   : this.editTarget['y'] + this.roundCalc(e.pageY - this.baseY)
                    }
                }
            });
        }
        if (this.checkFlag('screen')) {
            console.log(this.roundCalc(e.pageX - this.baseX));
            this.props.dispatch({
                type    : 'ActiveLayout/setXY',
                x       : this.screenX - this.roundCalc(e.pageX - this.baseX),
                y       : this.screenY - this.roundCalc(e.pageY - this.baseY)
            });
        }
    }

    private roundCalc(val: number): number
    {
        return val * this.al.rate / this.constRate;
    }

    private setTextTarget(key: number): void
    {
        this.props.dispatch({
            type    : 'ListText/setSpot',
            spot    : key,
        });
    }

    private calcViewBox(): string
    {
        return this.al.x + ', ' + 
                this.al.y + ', ' + 
                this.al.width * this.al.rate + ', ' + 
                this.al.height * this.al.rate;
    }

    public setFlag(flag: string, val: boolean): void
    {
        this.flags[flag] = val;
    }

    public checkFlag(flag): boolean
    {
        let c: boolean = false;
        for (const key in this.flags) {
            if (Object.prototype.hasOwnProperty.call(this.flags, key)) {
                if (key === flag && this.flags[key]) {
                    c = true;
                } else if (this.flags[key]) {
                    c = false;
                }
            }
        }
        return c;
    }
}

export default connect(
    (state: any) => {
        return state;
    }
)(ShowText)
