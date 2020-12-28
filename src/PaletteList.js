import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import {CSSTransition, TransitionGroup,} from 'react-transition-group';



export default withStyles(styles)(class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state={
            openDeleteDialog:false,
            deletingId:""
        };
        this.openDialog=this.openDialog.bind(this);
        this.closeDialog=this.closeDialog.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }
    openDialog(id){
        this.setState({openDeleteDialog:true , deletingId:id})
    };

    closeDialog(){
        this.setState({openDeleteDialog:false, deletingId:""})
    };

    handleDelete(){
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
    };
    
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    };

    render() {
        const { palettes , classes , deletePalette } = this.props;
        const {openDeleteDialog,deletingId}=this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    
                      <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette=>(
                              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                                <MiniPalette {...palette} 
                                            id={palette.id}
                                            key={palette.id}
                                            // deletePalette={deletePalette}
                                            openDialog={this.openDialog}
                                            handleClick={()=>this.goToPalette(palette.id)} 
                                />
                                </CSSTransition>
                            ))
                        }
                      </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog}
                         onClose={this.closeDialog} 
                         aria-labelledby="delete-dialog-title"
                >
                    <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: blue[200], color: blue[600]}}>
                                    <CheckIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>Delete</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor:red[200], color:red[600]}}>
                                    <CloseIcon/>
                                </Avatar >
                            </ListItemAvatar>
                            <ListItemText>Cancel</ListItemText>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
})
