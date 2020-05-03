import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.scss';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/validation';

const Auth = props => {

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        };
        setAuthForm(updatedControls);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    let formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key],
        })
    };

    let input = formElementsArray.map(formElement => {
        return (
                <Input
                    key ={formElement.id} 
                    label = {formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    invalid = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed = {(event) => inputChangedHandler(event, formElement.id)}/>
                )
    });

    if (props.loading) {
        input = <Spinner/>
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    return (
        <div className="Auth">
            {props.isAuthenticated ? <Redirect to={authRedirectPath}/> : null}
            <h1>{isSignup ? 'SIGN UP' : 'SIGN IN'}</h1>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {input}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                clicked = {switchAuthModeHandler}
                btnType='Danger'>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
