import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import {Link} from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state={newPaletteName:"" , formShowing:false};
        this.showForm=this.showForm.bind(this);
        this.hideForm=this.hideForm.bind(this);
        this.showEmoji=this.showEmoji.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
               this.props.palettes.every(
                 ({paletteName})=>paletteName.toLowerCase() !== value.toLowerCase()
               )
          );
    }
    showForm(){
        this.setState({formShowing:"form"})
    }
    showEmoji(){
        this.setState({formShowing:"emoji"})
    }
    hideForm(){
        this.setState({formShowing:false})
    }
    render() {
       const { open , classes , handleDrawerOpen , palettes ,
                  savePalette , colors , history}=this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                    Create A Palette
                    </Typography>
                </Toolbar>
                    <div className={classes.navBtns}>
                        
                        <Link to="/" className={classes.button}>
                            <Button variant="contained" color="secondary">Go Back</Button>
                        </Link>
                        <Button className={classes.button} 
                                variant="contained" 
                                color="primary" 
                                onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>    
                {this.state.formShowing && 
                    <PaletteMetaForm palettes={palettes}
                                        savePalette={savePalette}
                                        colors={colors}
                                        history={history}
                                        hideForm={this.hideForm}
                                        formShowing={this.state.formShowing}
                                        showEmoji={this.showEmoji}
                />}  
            </div>
        )
    }
}
export default withStyles(styles,{withTheme:true})(PaletteFormNav)
