import React, { Component } from 'react';
import DirectionsInput from './DirectionsInput';
import NameInput from './NameInput';
import { Redirect } from 'react-router-dom';
import IngredientandAmountInputsContainer from './IngredientandAmountInputsContainer';
import './AddRecipeForm.css';

export default class AddRecipeForm extends Component {
  constructor(props) {
    super(props);
    if (sessionStorage.form && JSON.parse(sessionStorage.form)) {
      this.state = JSON.parse(sessionStorage.form);
    } else {
      sessionStorage.form = '';
    }
  }
  state = {
    name: '',
    ingredientAndAmountInputs: [{ id: 0, ingredient: '', amount: '' }],
    directions: '',
    submitted: false,
  };
  componentDidUpdate() {
    if (!this.state.submitted) {
      this.storeInSessionStorage();
    }
  }
  addInputs = () => {
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs.slice();
    const newInputId = tempIngredientAndAmountInputs.length;
    tempIngredientAndAmountInputs.push({ id: newInputId, ingredient: '', amount: '' });
    this.setState({
      ingredientAndAmountInputs: tempIngredientAndAmountInputs,
    });
  };
  removeInput = id => {
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs
      .filter(input => input.id !== id)
      .map((input, index) => {
        input.id = index;
        return input;
      });
    this.setState({ ingredientAndAmountInputs: tempIngredientAndAmountInputs });
  };
  getIngredientAndAmountCopybyId(id) {
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs.slice();
    return tempIngredientAndAmountInputs.find(input => input.id === id);
  }
  storeInSessionStorage() {
    setTimeout(() => (sessionStorage.form = JSON.stringify(this.state)), 0);
  }
  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };
  handleIngredientAndAmountChange = (id, name, value) => {
    const tempIngredientAndAmountInputs = this.state.ingredientAndAmountInputs.slice();
    const ingredientAndAmountTemp = this.getIngredientAndAmountCopybyId(id);
    ingredientAndAmountTemp[name] = value;
    tempIngredientAndAmountInputs[id] = ingredientAndAmountTemp;
    this.setState({ ingredientAndAmountInputs: tempIngredientAndAmountInputs });
  };
  submit = () => {
    const form = document.querySelector('#form');
    const requiredNodeList = form.getElementsByClassName('required');
    if (requiredNodeList.length === 0) {
      const form = { ...this.state };
      const ingredients = form.ingredientAndAmountInputs
        .filter(ingr => ingr.ingredient.length > 0)
        .map(ingr => ({
          ingredient: ingr.ingredient,
          amount: ingr.amount,
        }));
      const recipe = { name: form.name, ingredients: ingredients, directions: form.directions };
      this.props.updateRecipes(recipe);
      sessionStorage.form = null;
      this.setState(state => {
        state.submitted = true;
      });
    } else {
      const requiredNodeArray = Array.from(requiredNodeList);
      const h2 = form.querySelector('#requestFill');
      let h2transition = 0;
      console.dir(h2);
      h2.style.position = 'relative';
      const h2top = window.getComputedStyle(h2).top;
      h2.style.top = h2top;
      setTimeout(() => {
        h2.style.top = `${window.scrollY + window.innerHeight / 3}px`;
        h2.style.left = `${(window.innerWidth - h2.clientWidth) / 2}px`;
      }, 0);
      function h2Transition() {
        if (0 === h2transition++) {
          h2.style.top = h2top;
        } else {
          h2.style.position = 'initial';
        }
        h2.removeEventListener('transitionend', h2Transition);
      }
      h2.addEventListener('transitionend', h2Transition);

      function toggleClass() {
        requiredNodeArray.forEach(elem => {
          elem.className = elem.className === 'required' ? 'unrequired' : 'required';
        });
      }
      const interval = setInterval(toggleClass, 400);
      setTimeout(() => {
        clearInterval(interval);
        requiredNodeArray.forEach(elem => (elem.className = 'required'));
      }, 2800);
    }
  };

  render() {
    return !this.state.submitted ? (
      <div id="form">
        <h2 id="requestFill">Please fill out highlighted fields.</h2>
        <NameInput value={this.state.name} handleInputChange={this.handleInputChange} />
        <br />
        <IngredientandAmountInputsContainer
          removeInput={this.removeInput}
          handleInputChange={this.handleIngredientAndAmountChange}
          inputs={this.state.ingredientAndAmountInputs}
        />
        <button onClick={this.addInputs} disabled={this.state.ingredientAndAmountInputs.length >= 20}>
          add ingredient
        </button>
        <DirectionsInput value={this.state.directions} handleInputChange={this.handleInputChange} />
        <button onClick={this.submit}>submit </button>
      </div>
    ) : (
      <Redirect to="/recipe-book" />
    );
  }
}
