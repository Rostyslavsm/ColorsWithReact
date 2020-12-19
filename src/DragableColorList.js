import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DragableColorBox from "./DragableColorBox";


const DraggableColorList= SortableContainer(({ colors , removeColor })=> {
    
    return (
        <div style={{ height:"100%"}}>
            {colors.map((color,i)=>(
                <DragableColorBox key={color.name} 
                              color={color.color} 
                              name={color.name}
                              index={i}
                              handleClick={()=>removeColor(color.name)}
                />          
            ))}
        </div>
    );
})

export default DraggableColorList
