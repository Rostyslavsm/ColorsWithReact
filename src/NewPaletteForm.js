import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import DragableColorList from "./DragableColorList";
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from "./ColorPickerForm";
 

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
    const {maxColors=20 , palettes }=props;

    const [colors , addNewColor ] = React.useState(palettes[0].colors);
    const [newPaletteName, changeNewPaletteName]=React.useState("");
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    const theme = useTheme();
    

    const newPalette ={paletteName:newPaletteName,
                      id: newPaletteName.toLowerCase().replace(/ /g,"-") ,
                      colors: colors};

    const paletteIsFull=(colors.length >= maxColors);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
      props.savePalette(newPalette) ; props.history.push("/")
    };

    const removeColor = (colorName) => {
      addNewColor(colors.filter(color=>color.name!==colorName))
    };

    const onSortEnd = ({ oldIndex, newIndex }) => 
        addNewColor(arrayMove(colors, oldIndex, newIndex));

    const allColors = palettes.map(p=>p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    const addRandomColor = () => addNewColor([...colors, randomColor])

    
    
    return (
      <div className={classes.root}>
        <PaletteFormNav open={open}
                       classes={classes} 
                       palettes={palettes}
                       handleDrawerOpen={handleDrawerOpen}
                       handleSubmit={handleSubmit}
                       newPaletteName={newPaletteName}
                       changeNewPaletteName={changeNewPaletteName}
                       />
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
            <Button variant="contained" color="secondary" onClick={()=>addNewColor([])}>Clear Palette</Button>
            <Button variant="contained" 
                    color="primary" 
                    onClick={addRandomColor} 
                    disabled={paletteIsFull}>
                      {paletteIsFull ? "Palette is full":"Random Color"}
            </Button>
          </div>
          <ColorPickerForm 
                          addNewColor={addNewColor}
                          colors={colors}
                          paletteIsFull={paletteIsFull}
          />
        </Drawer>
        <main className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
          <div className={classes.drawerHeader} />
          <DragableColorList colors={colors} 
                              removeColor={removeColor} 
                              axis='xy'
                              onSortEnd={onSortEnd}
                              />
          </main>
      </div>
    );
  }
