import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { mergeClasses } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
    root:{
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg":{
            color:"white",
            transform:"scale(1.5)"
        }    
    },
    boxContent:{
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        color: "rgba(0, 0, 0, 0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display:"flex",
        justifyContent:"space-between",
    },
    deleteIcon:{
        transition:"all 0.3s ease-in-out"
    }
}));

export default function DragableColorBox(props) {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{backgroundColor:props.color}}>
            <div className={classes.boxContent}>
              <span>{props.name}</span>
              <DeleteIcon className={classes.deleteIcon}/>
            </div>
        </div>
    )
}
