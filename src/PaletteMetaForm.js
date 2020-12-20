import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


export default function PaletteMetaForm (props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, changeNewPaletteName] = React.useState("");
  const { palettes , savePalette , colors , history}=props;
  const newPalette ={paletteName:newPaletteName,
    id: newPaletteName.toLowerCase().replace(/ /g,"-") ,
    colors: colors};


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    savePalette(newPalette) ;
    history.push("/")
  };
  React.useEffect(()=>{
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
           palettes.every(
             ({paletteName})=>paletteName.toLowerCase() !== value.toLowerCase()
           )
      );
})

  return (
    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it's unique
          </DialogContentText>

              
                    <TextValidator label="Enter Palette Name" 
                                    fullWidth
                                    margin="normal"
                                    name="newPaletteName"
                                    value={newPaletteName}
                                    onChange={(evt)=>changeNewPaletteName(evt.target.value) }
                                    validators={['required',"isPaletteNameUnique"]}
                                    errorMessages={['Palette name can not be empty', 'Name already used']}
                                    />
                    
                    

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
            <Button variant="contained" 
                            color="primary"
                            type="submit"
                            >
                                Save Palette
            </Button>
        </DialogActions>
        </ValidatorForm> 
      </Dialog>
    
  );
}