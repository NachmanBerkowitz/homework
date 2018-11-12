import React, { Component } from 'react'
import IngredientAndAmount from './IngredientAndAmount';
import DirectionsInput from './DirectionsInput';
import NameInput from './NameInput';

export default class AddRecipeForm extends Component {
  state={
    name:'',
    ingredientAndAmountInputs:[{id:0,ingredient:'',amount:''}],
    directions:''
  }
  displayIngredientAndAmountInputs(){
    return this.state.ingredientAndAmountInputs
    .map((input)=><IngredientAndAmount removeInput={this.removeInput} key={input.id} id={input.id}
     disableRemoveButton={this.state.ingredientAndAmountInputs.length>1?false:true}
     handleIngredientAndAmountChange={this.handleIngredientAndAmountChange}/>)
  }
  addInputs=()=>{
    const newInputId = this.state.ingredientAndAmountInputs.length;
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs.slice();
    tempIngredientAndAmountInputs.push({id:newInputId,ingredientValue:'',amountValue:''});
    this.setState({amountOfIngredientInputs:newInputId,ingredientAndAmountInputs:tempIngredientAndAmountInputs});
  }
  removeInput=(id)=>{
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs
    .filter((input)=>input.id !== id).map((input,index)=>{input.id=index; return input});
    this.setState({ingredientAndAmountInputs:tempIngredientAndAmountInputs})
  }
  getIngredientAndAmountCopybyId(id){
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs.slice();
    return tempIngredientAndAmountInputs.find((input)=>input.id===id)
  }
  
    handleInputChange=(name,value)=>{
      this.setState({
        [name]: value
    });
    };
    handleIngredientAndAmountChange=(id,name,value)=>{
      const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs.slice();
      const ingredientAndAmountTemp = this.getIngredientAndAmountCopybyId(id);
      console.log(id);
      ingredientAndAmountTemp[name]=value;
      tempIngredientAndAmountInputs[id]=ingredientAndAmountTemp;
      this.setState({ingredientAndAmountInputs:tempIngredientAndAmountInputs})
    }
    submit=()=>{
      const form = {...this.state};
      const ingredients = form.ingredientAndAmountInputs.map((ingr)=>({ingredient:ingr.ingredient,amount:ingr.amount}))
      const recipe = {name:form.name,
                      ingredients:ingredients,
                      directions:form.directions};
      this.props.updateRecipes(recipe);
    }
  
  render() {
    return (
      <div>
        <NameInput handleInputChange={this.handleInputChange}/><br/>
        {this.displayIngredientAndAmountInputs()}
        <button onClick={this.addInputs}>add ingredient</button>
        <DirectionsInput handleInputChange={this.handleInputChange}/>
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}
