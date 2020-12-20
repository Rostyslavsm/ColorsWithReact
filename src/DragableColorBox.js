import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import useStyles from "./styles/DragableColorBoxStyles"

const DragableColorBox=SortableElement((props)=> {
    const classes = useStyles();
    const {name , handleClick , color} = props;
    return (
        <div className={classes.root} style={{backgroundColor:color}}>
            <div className={classes.boxContent}>
              <span>{name}</span>
              <DeleteIcon className={classes.deleteIcon}
                            onClick={handleClick}/>
            </div>
        </div>
    )
})
export default DragableColorBox