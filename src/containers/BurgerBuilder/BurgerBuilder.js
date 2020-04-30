import React, { Component } from 'react';
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


class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchaseable: false,
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
        this.props.onInitPrice();
    }

    updatePurchaseState(ingredients) { 
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    } ,0);

        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     // const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.props.price;
    //     // const newPrice = oldPrice + priceAddition;
    //     this.updatePurchaseState(updatedIngredients);
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         // totalPrice: newPrice,
    //     });
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     if (updatedCount >= 0) {
    //         updatedIngredients[type] = updatedCount;
    //     }
    //     // const priceDeduction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.props.price;
    //     // const newPrice = oldPrice - priceDeduction;
    //     this.updatePurchaseState(updatedIngredients);
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         // totalPrice: newPrice,
    //     });
    // }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth'); 
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You Continue");
        // console.log(this.props);
        // const queryParams = [];

        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');

        // console.log(queryString);
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        }); 
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        console.log(this.props.error);

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> :<Spinner />;

        if (this.props.ings && this.props.price) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemove}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        isAuth = {this.props.isAuthenticated}/>
                </Aux>
            )

            orderSummary = <OrderSummary 
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                                price = {this.props.price}
                                ingredients = {this.props.ings}/>

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
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
