import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";



export default withStyles(styles)(class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    };

    render() {
        const { palettes , classes , deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        React ColorsZ
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette=>(
                                <MiniPalette {...palette} 
                                            id={palette.id}
                                            key={palette.id}
                                            deletePalette={deletePalette}
                                            handleClick={()=>this.goToPalette(palette.id)} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
})
