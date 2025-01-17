import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/NavbarStyles"

export default withStyles(styles)(class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { format:"hex" ,
                       open:false  };
        this.handleChange=this.handleChange.bind(this);
        this.closeSnackbar=this.closeSnackbar.bind(this);
    };

    handleChange(e){
        this.setState({format:e.target.value , open:true});
        this.props.handleChange(e.target.value);
    };

    closeSnackbar(){
        this.setState({open:false});
    };

    render() {
        const { level , changeLevel , showingAllColors, classes} = this.props;
        const { format } = this.state;
        return (
            <header className={classes.Navbar}> 
                <div className={classes.logo}>
                    <Link to = "/">ColorsWithReact</Link>
                </div>
                {showingAllColors && (
                    <div>
                        <span>
                            Level: {level}
                        </span>
                        <div className={classes.slider}>
                        <Slider defaultValue={level} 
                                min={100} 
                                max={900} 
                                step={100}
                                onAfterChange={changeLevel}/>
                        </div>
                    </div>
                )}
               <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleChange}>
                        <MenuItem value="hex">Hex </MenuItem> 
                        <MenuItem value="rgb">Rgb  </MenuItem>  
                        <MenuItem value="rgba">RGBA </MenuItem>   
                    </Select>
               </div>
               <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }} 
                open={this.state.open}
                autoHideDuration={3000}
                message={<span id="message-id" >
                            Format Changed to { format.toUpperCase() }
                        </span>}
                ContentProps={{"aria-describedby" : "message-id"}}
                onClose={this.closeSnackbar}
                action={[
                    <IconButton 
                        onClick= {this.closeSnackbar} 
                        color="inherit" key="close"
                        aria-label="close"
                        >
                        <CloseIcon/>
                    </IconButton>  
                ]}
                />
            </header>
        )
    }
})

