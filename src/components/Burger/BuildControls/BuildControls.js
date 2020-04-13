import React from 'react';

import "./BuildControls.scss";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    const buildControl = controls.map((control) => {
        return <BuildControl 
        label = {control.label} 
        key = {control.label}
        added = {() => props.ingredientAdded(control.type)}
        removed = {() => props.ingredientRemoved(control.type)}
        disabled = {props.disabled[control.type]}/>
    });

    return (
        <div className="BuildControls">
            <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {buildControl}
        </div>
    );
}

export default buildControls;
