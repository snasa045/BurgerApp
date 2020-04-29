import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     totalPrice: 0,
    // }
    
    // constructor(props) {
    //     super(props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.state = { 
    //         ingredients:  ingredients, 
    //         totalPrice: price};
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to ='/'/>

        if (this.props.ings) {

            const purchasedRedirect = this.props.purchased ? <Redirect to ='/'/> : null;

            summary = (
                        <div>
                            { purchasedRedirect }
                            <CheckoutSummary 
                                ingredients = {this.props.ings}
                                checkoutCancelled={this.checkoutCancelledHandler}
                                checkoutContinued={this.checkoutContinuedHandler}/>
                            <Route path={this.props.match.path + '/contact-data'}
                                component={ContactData}/>
                        </div>
                    )
        }
        return summary;
                // {/* <Route 
                //     path={this.props.match.path + '/contact-data'}
                //     render = {(props) => (<ContactData 
                //                         ingredients = {this.props.ings}
                //                         price = {this.props.price}
                //                         {...props}/>)} 
                //     /> */}
                    
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios));
