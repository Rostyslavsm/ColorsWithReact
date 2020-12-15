import React, { Component } from 'react';
import "./ColorBox.css";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const styles={
    ColorBox:{
        width: "20%",
        height: props=> (props.showingFullPalette? "25%": "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button":{
            opacity:"1"
        }
    },
    copyText:{
        color: props=> chroma(props.background).luminance() >= 0.7?"black" : "white"
    },
    colorName:{
        color: props=> chroma(props.background).luminance() <= 0.15?"white" : "black"
    },
    seeMore:{
            background: "rgba(255,255,255,0.3)",
            position: "absolute",
            border: "none",
            right: "0px",
            bottom: "0px",
            color: props=>
                chroma(props.background).luminance() >= 0.7?"rgba(0,0,0,0.6)" : "white",
            width: "60px",
            height: "30px",
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: "30px"
    },
    copyButton:{
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255,255,255,0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        color: props=>
             chroma(props.background).luminance() >= 0.7? "rgba(0,0,0,0.6)" : "white",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity:"0"
    },
};

export default withStyles(styles)(class colorBox extends Component {
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
        const {name , background , moreUrl , showingFullPalette , classes} = this.props;
        const { copied } =this.state;
        
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopystate}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div 
                        className={`copy-overlay ${copied && "show"}`} 
                        style={{ background }}
                    />
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>COPIED!</h1>
                        <p className={classes.copyText}>
                            {background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}> Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={`/palette/${moreUrl}`} onClick={(e)=>e.stopPropagation()}>
                            <span className={classes.seeMore}>  More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
})
