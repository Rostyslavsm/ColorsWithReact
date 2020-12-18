import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ChromePicker} from "react-color";
import { Button } from '@material-ui/core';
import DragableColorBox from "./DragableColorBox";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
 

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height:"calc(100vh - 63px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
    const [currentColor , setColor ] = React.useState("red");
    const [colors , addNewColor ] = React.useState([{name:"blue", color:"red"}]);
    const [newName , handleChange]= React.useState("")

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    let newPaletteName="New Test Palette"
    const newPalette ={paletteName:newPaletteName,
                      id: newPaletteName.toLowerCase().replace(/ /g,"-") ,
                      colors: colors};
    
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
      props.savePalette(newPalette) ; props.history.push("/")
    };

    React.useEffect(
      ()=>ValidatorForm.addValidationRule("isColorNameUnique", (value) => 
        colors.every(
           ({name})=> name.toLowerCase() !== value.toLowerCase() 
        )
      )
    );

    React.useEffect(
      ()=>ValidatorForm.addValidationRule("isColorUnique", () =>
         colors.every( 
            ({color})=> color !== currentColor 
         )
      )
    );
    
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
              Persistent drawer
            </Typography>
            <Button variant="contained" 
                    color="primary" 
                    onClick={handleSubmit}
                    >
                      Save Palette
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">
              Design your Palette
          </Typography>
          <div>
            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Color</Button>
          </div>
          <ChromePicker color={currentColor} 
                        onChangeComplete={(newColor)=>setColor(newColor.hex)}
          />
          <ValidatorForm onSubmit={
            () => {addNewColor([...colors , {name:newName , color:currentColor}]); 
            handleChange("")}
             }>
            <TextValidator 
              value={newName}
              onChange={(evt)=>handleChange(evt.target.value)}
              validators={['required',"isColorNameUnique","isColorUnique"]}
              errorMessages={['this field is required', 'Color name must be unique',"Color already used"]}
            />
            <Button variant="contained" 
                  color="primary" 
                  style={{backgroundColor:currentColor}}
                  type="submit"
                  >
                    Add Color
            </Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          
            {colors.map(colorObj=>(
              <DragableColorBox key={colorObj.color} color={colorObj.color} name={colorObj.name}/>
            ))}
          
        </main>
      </div>
    );
  }
