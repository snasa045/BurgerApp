import React from 'react';
import './Order.scss';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientsOutput = ingredients.map(ig => {
        return  <span
                        style = {{
                            textTransform: 'capitalize',
                            margin: '0 8px',
                            display: 'inline-block',
                            border: '1px solid #ccc',
                            padding: '5px'
                        }}
                        key = {ig.name}>{ig.name} ({ig.amount})</span>
               
    })

    return (
        <div className = "Order">
            <p>Ingredients:{ingredientsOutput} </p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;
