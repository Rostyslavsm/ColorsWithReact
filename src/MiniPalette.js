import React from "react";
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

function MiniPalette(props){
    const {classes , paletteName , emoji, colors , handleClick , deletePalette}=props;
    const miniColorBoxes= colors.map(color=>
        <div className={classes.miniColor} 
            style={{backgroundColor: color.color}}
            key={color.name}
        />
    )
    const handleDelete=(e)=>{
        e.stopPropagation();
        deletePalette(props.id)
    }
    return (
        <div className={classes.root} onClick={handleClick}>
            <DeleteIcon className={classes.deleteIcon}
                        onClick={handleDelete}
            />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}<span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette)