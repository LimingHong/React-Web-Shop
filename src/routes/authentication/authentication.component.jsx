import {
     auth,
     signInWithGooglePopup,      
     createUserDocumentFromAuth, 
     signInWithGoogleRedirect} from "../../utils/firebase/firebase.utils"
import {useEffect} from 'react'
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from "../../components/sign-up-form/signup-form.component"
import SignInForm from "../../components/sign-in-form/signin-form.component"
import './authentication.styles.scss'

const Authentication = () =>{
    useEffect(()=>{
        const loadData = async() => {
        const response = await getRedirectResult(auth);
        console.log(response);
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }    
        };
        loadData(); 
},[]);
    const logGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);        
    }

    const logGoogleRedirectUser = async() => {
        const {user} = await signInWithGoogleRedirect();
        console.log(user);    
    }
    const logEmailPassword = async() => {
        

    }   
    return (
        
        <div className="authentication-container">
            
            <SignInForm/>                       
            <SignUpForm/>
            {/*<button type='google'onClick = {logGoogle}>Sign in With Google Pop up</button>
    <button type='google'onClick = {signInWithGoogleRedirect}>Sign in With Google Redirect</button>*/}
        </div>
    );

}
export default Authentication