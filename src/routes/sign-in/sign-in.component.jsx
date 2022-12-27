import { signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"

const SignIn = () =>{
    const logGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);        
    }
   
    return (
        
        <div>
            <h1>Sign In Page</h1>
            <button onClick = {logGoogle}>Sign in With Google Pop up</button>
        </div>
    );

}
export default SignIn