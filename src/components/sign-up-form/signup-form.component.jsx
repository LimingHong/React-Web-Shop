import {useState} from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './signup-form.styles.scss'
import Button from '../button/button.component'
const defaultFormFields = {
    displayName:'',
    email: '',
    password: '',
    confirmPassword:''
}
const SignUpForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);              
    const {displayName, email, password, confirmPassword} = formFields;
    console.log({formFields});

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        };
        try{
        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        // console.log({user});
        // console.log({displayName});
        await createUserDocumentFromAuth(user, {displayName}); 
        resetFormFields();
        } 
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Can not create user, email already in use')
            }
            console.log('user create encounter error: ', error);
        }
    } // async because we generate method result from external service

    const handleChange = (event)=>{

        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
        //only update value of specific name 
    }
    return(
        <div className='sign-up-container'>
            <h2>Don't have an accout?</h2>
            <span>
                Sign Up with your email and password
            </span>
            <form onSubmit={handleSubmit}>
            
            {/* you can pass object 
            <FormInput
                label="Display Name"
                inputOptions ={{
                type:"text" 
                required: ture
                onChange: handleChange 
                name: 'displayName' 
                value: displayName   
                }}

                ></FormInput>*/}
            <FormInput
                label="Display Name"
                type="text" 
                required
                onChange={handleChange} 
                name='displayName' 
                value= {displayName}></FormInput>
            
            <FormInput 
            label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name='email'
                value = {email}
            ></FormInput>
            
            <FormInput 
                label="Password"    
                type="password" 
                required 
                onChange={handleChange} 
                name='password'
                value = {password}
            ></FormInput>
            
            <FormInput 
                label="Confirm Password"
                type="password" 
                required 
                onChange={handleChange}
                name='confirmPassword' 
                value = {confirmPassword}
             ></FormInput>  
            <Button type="submit">Sign Up</Button>          
            </form>
        </div>

    );
   
}
export default SignUpForm;