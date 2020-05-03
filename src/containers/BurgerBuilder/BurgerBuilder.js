import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux/Aux";

import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as action from '../../store/actions/index'


const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const {onInitIngredients, onInitPrice} = props;

    useEffect(() => {
        onInitIngredients();
        onInitPrice();
    }, [onInitIngredients, onInitPrice])

    const updatePurchaseState = (ingredients) => { 
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    } ,0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth'); 
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: '/checkout',
        }); 
    }

    const disabledInfo = {
        ...props.ings
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    console.log(props.error);

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> :<Spinner />;

    if (props.ings && props.price) {
        burger = (
            <Aux>
                <Burger ingredients = {props.ings}/>
                <BuildControls 
                    ingredientAdded = {props.onIngredientAdded}
                    ingredientRemoved = {props.onIngredientRemove}
                    disabled = {disabledInfo}
                    price = {props.price}
                    purchaseable = {updatePurchaseState(props.ings)}
                    ordered = {purchaseHandler}
                    isAuth = {props.isAuthenticated}/>
            </Aux>
        )

        orderSummary = <OrderSummary 
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued = {purchaseContinueHandler}
                            price = {props.price}
                            ingredients = {props.ings}/>

    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed = {purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(action.addIngredients(ingName)),
        onIngredientRemove: (ingName) => dispatch(action.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(action.initIngredients()),
        onInitPrice: () => dispatch(action.initPrice()),
        onInitPurchase: () => dispatch(action.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
