import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: null,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 1,
    cheese: 2,
    meat: 3.5,
    bacon: 3.5
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                building: true
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                building: false
            }

        case actionTypes.SET_PRICE:
            return {
                ...state,
                totalPrice: action.price
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: true
            }
    
        default:
            return state;
    }
}

export default burgerBuilderReducer;