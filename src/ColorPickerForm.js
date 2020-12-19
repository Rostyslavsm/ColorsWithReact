import React , {Component} from 'react';
import {ChromePicker} from "react-color";
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
        const {addNewColor,colors,paletteIsFull} =this.props;
        const {newColorName , currentColor }=this.state;
        return (
            <div>
                <ChromePicker color={currentColor} 
                                onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={
                        () => {addNewColor([...colors , {name:newColorName , color:currentColor}]); 
                        this.handleChange("")}
                    }>
                    <TextValidator 
                    value={newColorName}
                    name="newColorName"
                    onChange={(evt)=>this.handleChange(evt.target.value)}
                    validators={['required',"isColorNameUnique","isColorUnique"]}
                    errorMessages={['this field is required', 'Color name must be unique',"Color already used"]}
                    />
                    <Button variant="contained" 
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
export default ColorPickerForm;
