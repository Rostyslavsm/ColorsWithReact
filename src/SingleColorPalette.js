import React, { Component } from 'react';
import ColorBox from "./colorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/PaletteStyles"


export default withStyles(styles)(class SingleColorPalette extends Component {
     constructor(props){
         super(props);
         this._shades=this.gatherShades(this.props.palette, this.props.colorId);
         this.state={format:"hex"};
         this.changeFormat=this.changeFormat.bind(this)
     }

     gatherShades(palette , colorToFilterBy){
          let shades=[];
          let allColors= palette.colors;
   
             for (let key in allColors){
                     shades=shades.concat(
                         allColors[key].filter(element=>element.id===colorToFilterBy)
                     )
                 };
          return shades.slice(1)
     };
    
    changeFormat(val){
        this.setState({format:val})
    };

    render() {
        const { format }=this.state;
        const { classes }=this.props;
        const { paletteName , emoji , id }=this.props.palette;
        const colorBoxes = this._shades.map(color=>
            <ColorBox color={color.hex} 
                        key={color.name} 
                        background={color[format]} 
                        showingFullPalette={false}/>
        )
        return (
            <div className={classes.palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
})
