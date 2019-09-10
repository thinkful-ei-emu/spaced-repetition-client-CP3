import React from "react"
   
let SRContext = React.createContext({
        loadLangWords: () =>{},
        updateLangWords:()=>{},
        submitAnswer: () =>{}, 
        language: {},
        words: []
    })
export default SRContext;