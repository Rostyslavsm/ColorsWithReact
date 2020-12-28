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
import useStyles from "./styles/NewPaletteFormStyles";
 
export default function NewPaletteForm(props) {
    const {maxColors=20 , palettes , savePalette ,history}=props;
    const [colors , addNewColor ] = React.useState(palettes[0].colors);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const paletteIsFull=(colors.length >= maxColors);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
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
                       palettes={palettes}
                       handleDrawerOpen={handleDrawerOpen}
                       savePalette={savePalette}
                       colors={colors}
                       history={history}
                       />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
              <Divider />
              <div className={classes.container}>
                <Typography variant="h4" gutterBottom>
                    Design your Palette
                </Typography>
                <div className={classes.buttons}>
                  <Button variant="contained" 
                          className={classes.button}
                          color="secondary" 
                          onClick={()=>addNewColor([])}>Clear Palette
                  </Button>
                  <Button variant="contained" 
                          className={classes.button}
                          color="primary" 
                          onClick={addRandomColor} 
                          disabled={paletteIsFull}>
                            {paletteIsFull ? "Palette is full":"Random Color"}
                  </Button>
                </div>
                <ColorPickerForm addNewColor={addNewColor}
                                  colors={colors}
                                  paletteIsFull={paletteIsFull}
                  />
              </div>
            </Drawer>
              <main className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}>
                <div className={classes.drawerHeader}/>
                <DragableColorList colors={colors} 
                                    removeColor={removeColor} 
                                    axis='xy'
                                    onSortEnd={onSortEnd}
                                    distance={20}
                  />
              </main>
      </div>
    );
  }
