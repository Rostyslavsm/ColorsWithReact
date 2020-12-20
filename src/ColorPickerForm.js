import React , {Component} from 'react';
import {ChromePicker} from "react-color";
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from "@material-ui/core/styles";

const styles = {
    picker:{
        width:"100% !important",
        marginTop:"2rem",
    },
    addColor:{
        width:"100%",
        padding:"1rem",
        marginTop:"1rem",
        fontSize:"2rem"
    },
    colorNameInput:{
        width:"100%",
        height:"70px"
    },
    container:{
        width:"100%",
    }
};

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state={currentColor:"" , newColorName:""};
        this.updateCurrentColor=this.updateCurrentColor.bind(this);
        this.handleChange=this.handleChange.bind(this);
    };
    handleChange(val){
        this.setState({newColorName:val})
    }

    updateCurrentColor(newColor){
        this.setState({currentColor: newColor.hex})
    }

    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique", (value) => 
              this.props.colors.every(
                 ({name})=> name.toLowerCase() !== value.toLowerCase() 
            )
        );
      
        ValidatorForm.addValidationRule("isColorUnique", () =>
             this.props.colors.every( 
                ({color})=> color !== this.state.currentColor 
          )
        );   
    }
    render() {
        const {addNewColor,colors,paletteIsFull,classes} =this.props;
        const {newColorName , currentColor }=this.state;
        return (
            <div className={classes.container}>
                <ChromePicker   className={classes.picker}
                                color={currentColor} 
                                onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={
                        () => {addNewColor([...colors , {name:newColorName , color:currentColor}]); 
                        this.handleChange("")}
                    }>
                    <TextValidator 
                    value={newColorName}
                    className={classes.colorNameInput}
                    placeholder="Color Name"
                    name="newColorName"
                    variant="filled"
                    margin="normal"
                    onChange={(evt)=>this.handleChange(evt.target.value)}
                    validators={['required',"isColorNameUnique","isColorUnique"]}
                    errorMessages={['this field is required', 'Color name must be unique',"Color already used"]}
                    />
                    <Button variant="contained" 
                        className={classes.addColor}
                        color="primary" 
                        style={{backgroundColor:currentColor}}
                        type="submit"
                        disabled={paletteIsFull}
                        >
                            {paletteIsFull ? "Palette is full":"Add color"}
                    </Button>
                </ValidatorForm>
          
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);
