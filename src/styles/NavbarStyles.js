import sizes from "./sizes";

const styles= {
    Navbar:{
        display: "flex",
        textAlign: "center",
        justifyContent: "flex-start",
        height: "6vh",
        alignItems: "center",
    },
    logo:{
        marginRight: "15px" ,
        padding: "0 13px" ,
        fontSize: "22px" ,
        backgroundColor: "#eceff1" ,
        fontFamily: "'Roboto', sans-serif" ,
        height: "100%",
        display: "flex" ,
        alignItems: "center" ,
        "& a":{
            textDecoration: "none" ,
            color: "black",
            },
        [sizes.down("xs")]:{
            display:"none"
        }
    },
    slider:{
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
        "& .rc-slider-rail":{
            height: "8px",
        },
        "& .rc-slider-handle, .rc-slider-handle :focus, .rc-slider-handle :active, .rc-slider-handle :hover ":{
            backgroundColor: "green",
            outline: "none",
            border: "2px solid green",
            boxShadow: "none",
            width: "13px",
            height: "13px",
            marginTop: "-2px",
            marginLeft: "-7px",
        },
        "& .rc-slider-track":{           
            backgroundColor: "transparent",
        },
        [sizes.down("sm")]:{
            width:"150px"
        }
    },
    selectContainer:{
        marginLeft: "auto",
        marginRight: "1rem",
    }
    
}
export default styles