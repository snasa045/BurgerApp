import React from 'react';

import "./Burger.scss";
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    let transformedIngredients = [];
    if (props.ingredients) {
        transformedIngredients = Object.keys(props.ingredients)
                                        .map(igKey => {
    
                                            // returns the array of ingredients keys
                                            // console.log(Object.keys(props.ingredients));
    
                                            // returns the array of ingredients individual key's value length 
                                            // const arrayI = [...Array(props.ingredients[igKey])]
                                            // console.log(arrayI);
                                            return [...Array(props.ingredients[igKey])]
                                                .map((_, i) => {
                                                    return <BurgerIngredient key={igKey + i} type={igKey}/>
                                                });
                                        })
                                        .reduce((arr, el) => {
                                            return arr.concat(el);
                                        }, []);
    }


    console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className = "Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};


export default burger;
