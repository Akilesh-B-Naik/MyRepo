import React from 'react';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';



class IndescisionApp extends React.Component
{
    state = { 
                options:['test'],
                selectedOption:undefined
            };

    removeAll=()=> this.setState(()=>({options:[]}));
    remove=(optionToRemove) => {
        this.setState(
            (prevState)=>
            {
                options: prevState.options.filter((option)=>{optionToRemove !== option})
            }
        )
    }
   

    render()
    {
       const val=this.state;
        const subTitle='Put your life in hands of the computer.';
        return(
            <div>
                <Header subtitle={subTitle}/>
                <Action />
                <Options options={val.options} removeAll={val.options} remove={val.option}/>
                
                <AddOption />
             </div>
             );
    }
}

export default IndescisionApp;

