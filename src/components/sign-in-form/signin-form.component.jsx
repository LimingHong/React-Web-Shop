import {useState, useContext} from 'react' // useContext for pass user to App through context
import {signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './signin-form.styles.scss'
import Button from '../button/button.component'
import {UserContext, setCurrentUser} from '../../context/user.context'
const defaultFormFields = {    
    email: '',
    password: '',   
}
const SignInForm = ()=>{
    const [formFields, setFormFields] = useState(defaultFormFields);              
    const { email, password} = formFields;
    console.log({formFields});

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();        
        await createUserDocumentFromAuth(user);   
        setCurrentUser(user);  // we dont need this since we have subscribe in the user.context   
    }

    const handleSubmit = async (event) => {
        event.preventDefault();        
        try{
        const response = await signInAuthWithEmailAndPassword(email, password);      
        const {user} = response;
        setCurrentUser(user);
        resetFormFields();
        } 
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect passowrd for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    //console.log(error);                
            };            
            console.log('user create encounter error: ', error);
        }
    } // async because we generate method result from external service

    const handleChange = (event)=>{

        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
        //only update value of specific name 
    }

    const {setCurrentUser} = useContext(UserContext);
    return(
        <div className='sign-up-container'>
            <h2>Already have an accout?</h2>
            <span>
                Sign in with your email and password
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
            <div className='buttons-container'>                     
            <Button type="submit">Sign In</Button> 
            <Button type="button" buttonType='google'onClick = {signInWithGoogle}>Google Sign In</Button>   
            </div>       
            </form>
        </div>

    );
   
}
export default SignInForm;