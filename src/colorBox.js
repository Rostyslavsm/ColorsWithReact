import React, { Component } from 'react';
import "./ColorBox.css";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from "react-router-dom";


export default class colorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied:false};
        this.changeCopystate=this.changeCopystate.bind(this)
    }
    changeCopystate(){
        this.setState({copied:true}, 
         ()=>{setTimeout(()=>this.setState({copied:false}),1500);}
            );
    }
    render() {
        const {name , background , moreUrl , showLink} = this.props;
        const { copied } =this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopystate}>
                <div style={{ background }} className="ColorBox">
                <div className={`copy-overlay ${copied && "show"}`} style={{ background }}/>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button"> Copy</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${moreUrl}`} onClick={(e)=>e.stopPropagation()}>
                            <span className="see-more">  More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}
