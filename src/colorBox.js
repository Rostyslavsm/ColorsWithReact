import React, { Component } from 'react';
import "./ColorBox.css";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";


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
        const { copied } =this.state;
        const isDarkColor = chroma(background).luminance() <= 0.15;
        const isLightColor= chroma(background).luminance() >= 0.7;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopystate}>
                <div style={{ background }} className="ColorBox">
                    <div 
                        className={`copy-overlay ${copied && "show"}`} 
                        style={{ background }}
                    />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>COPIED!</h1>
                        <p className={isLightColor && "dark-text"}>
                            {background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className={`box-content ${isDarkColor && "light-text"}`}>
                            <span>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && "dark-text"}`}> Copy</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${moreUrl}`} onClick={(e)=>e.stopPropagation()}>
                            <span className={`see-more ${isLightColor && "dark-text"}`}>  More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}
