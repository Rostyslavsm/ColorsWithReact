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
import { mergeClasses } from '@material-ui/styles';

const drawerWidth = 400;

const styles = theme => ({
    root:{
        display:"flex",
        height:"64px",
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      navBtns:{
        marginRight:"1rem"
      },
      button:{
        margin: "0 0.5rem",
        "& a":{
        textDecoration: "none",}
      },
});

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state={newPaletteName:"" , formShowing:"true"};
        this.showForm=this.showForm.bind(this)
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
               this.props.palettes.every(
                 ({paletteName})=>paletteName.toLowerCase() !== value.toLowerCase()
               )
          );
    }
    showForm(){
        this.setState({formShowing:true})
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
                        {/* <ValidatorForm onSubmit={handleSubmit}>
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
                        </ValidatorForm> */}
                        

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
                />}  
            </div>
        )
    }
}
export default withStyles(styles,{withTheme:true})(PaletteFormNav)
