import React, { Component } from 'react';
import {Link} from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state={newPaletteName:""};
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
               this.props.palettes.every(
                 ({paletteName})=>paletteName.toLowerCase() !== value.toLowerCase()
               )
          );
    }
    
    render() {
       const { open , classes , handleDrawerOpen , handleSubmit , newPaletteName , changeNewPaletteName}=this.props
        return (
            <div>
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
                    Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
                    <TextValidator label="Enter Palette Name" 
                                    name="newPaletteName"
                                    value={newPaletteName}
                                    onChange={(evt)=>changeNewPaletteName(evt.target.value) }
                                    validators={['required',"isPaletteNameUnique"]}
                                    errorMessages={['Palette name can not be empty', 'Name already used']}
                                    />
                    <Button variant="contained" 
                            color="primary"
                            type="submit"
                            >
                                Save Palette
                    </Button>
                    <Link to="/">
                        <Button variant="contained" color="secondary">Go Back</Button>
                    </Link>
                    </ValidatorForm>
                </Toolbar>
                </AppBar>           
            </div>
        )
    }
}