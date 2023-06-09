//@ts-nocheck
import React, { useEffect, useReducer, useState } from "react";
import useForm from '../hooks/useForm.ts'
import {AuthState, AuthAction} from '../import/interfaces.ts'

const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'logout':
            return {
                ...initialState,
            }
        case 'login':
            const { username, password } = action.payload
            const user = { username: 'eisaf', password: '12345' }

            if (username == user.username && password == user.password){
                return{ username, isValid: true, token: 'ABC123', validating:false }
            }else { return { isValid: false } }
            
        default:
            return state;
    }
}
const initialState: AuthState = {
    validating: false,
    isValid: true,
    token: null,
    username: '',
    password: ''
}

function LoginForm() {
    const [state, handleChange] = useForm(initialState)
    const [{ username, token, isValid }, dispatch] = useReducer(authReducer, initialState)
    //const [submitted, setSubmitted] = useState(false)

    const login = (e: FormEvent<HTMLFormElement>) =>{
        const payload ={ username: state.username, password: state.password}
        e.preventDefault()
        setTimeout(dispatch({ type: 'login', payload },3000))
    }

    const logout = (e: FormEvent<HTMLFormElement>) => {

        dispatch({ type: 'logout' })
    }
    
     useEffect(() => {
        //isValid ? setSubmitted(true) : setSubmitted(true)

    }, [])

    return (
        <div>
            <form onSubmit={ login}>
                <h2>Inicia sesion</h2>
                <label>Username</label>
                <input
                    type='text'
                    name='username'
                    value={state.username}
                    onChange={handleChange}
                />
                <br/>
                <label>Password</label>
                <input
                    type='text'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                />
                <br/>
                <input type='submit' value='login'></input>
        
            </form>
            <br/>
            <br />
            <br/>
            {/* {submitted && <h2> Validando credenciales...</h2>} */}
            { !isValid && <h1> Incorrect user or password! Try again</h1>}
            { token && isValid &&
                <div className="response">
                   
                    <h1> Bienvenido {username}! </h1>
                    <input
                        type='submit'
                        name="logout"
                        value='logout'
                        onClick={logout}
                    />
                </div>
                
            }
        </div>
    )
}

export default LoginForm