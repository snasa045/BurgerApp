import React, { Component } from 'react';

import Aux from "../../hoc/Aux/Aux";

import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 1,
    cheese: 2,
    meat: 3.5,
    bacon: 3.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: null,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            // console.log(response);
            this.setState({ingredients: response.data})
            // console.log(this.state.ingredients)
        }).catch(err => {
            this.setState({error: true});
        });

        axios.get('/totalPrice.json').then(response => {
            // console.log(response);
            this.setState({totalPrice: response.data})
            // console.log(this.state.totalPrice)
        }).catch(err => {
            this.setState({error: true});
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    } ,0);

        this.setState({ purchaseable: sum > 0});

        console.log(sum);
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.updatePurchaseState(updatedIngredients);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        if (updatedCount >= 0) {
            updatedIngredients[type] = updatedCount;
        }
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.updatePurchaseState(updatedIngredients);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You Continue");
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sid',
                address: {
                    street: 'Teststreet 81',
                    postalCode: '8187299',
                    country: 'Canada'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
                console.log(response)
            }).catch(error =>{
                this.setState({
                    loading: false,
                    purchasing: false
                });
                console.log(error)
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> :<Spinner />;

        if (this.state.ingredients && this.state.totalPrice) {
            orderSummary = <OrderSummary 
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                                price = {this.state.totalPrice}
                                ingredients = {this.state.ingredients}/>

            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchaseable = {this.state.purchaseable}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            )

        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
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

export default withErrorHandler(BurgerBuilder, axios);
