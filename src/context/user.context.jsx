import {createContext, useState, useEffect } from "react";
import {onAuthStateChangedListener} from '../utils/firebase/firebase.utils';
//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null,
});

// To use the <UserProvider><App/></UserProvider> the children app will get access to the set states

export const UserProvider = ({children}) =>{
    const[currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user)=>{console.log(user);})
        return unsubcribe;
    }, []);  // pass value in '[]'to skip applying an effect if certain values haven’t changed
    return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    )

}