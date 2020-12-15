import React, { Component } from 'react';
import "./ColorBox.css";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from '@material-ui/core/styles';

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
    boxContent:{
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay:{
        opacity:"0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay:{
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMsg:{
        position: "fixed",
        top:"0",
        left:"0",
        right:"0",
        bottom:"0",
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        transform:"scale(0.1)",
        opacity:"0",
        color: "white",
        flexDirection: "column",
        "& h1":{
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width : "100%",
            textAlign:"center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase"
        },
        "& p":{
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showCopyMsg:{
        opacity: "1",
        transform: "scale(1)",
        zIndex: "11",
        transition: "all 0.6s ease-in-out",
        transitionDelay: "0.3s"
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
                        className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} 
                        style={{ background }}
                    />
                    <div className={`${classes.copyMsg} ${copied && classes.showCopyMsg}`}>
                        <h1>COPIED!</h1>
                        <p className={classes.copyText}>
                            {background}
                        </p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
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
