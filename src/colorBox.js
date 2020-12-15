import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/ColorBoxStyles"


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
