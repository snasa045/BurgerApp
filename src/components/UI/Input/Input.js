import React from 'react';
import './Input.scss';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ["InputElement"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className="ValidationError">Please enter a valid {props.elementConfig.placeholder}!</p>;
    }

    switch (props.elementType) {

        case ('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
            break;

        case ('textarea'):
            inputElement = <textarea 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
            break;

        case ('select'):
            inputElement = (<select 
                                className={inputClasses.join(' ')} 
                                value={props.value}
                                onChange={props.changed}> 
                                {props.elementConfig.options.map(option => {
                                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                                })}
                            </select>);
            break;
    
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}/>;
            break;
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement} 
            {validationError}
        </div>
    );
}

export default input;
