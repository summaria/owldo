
import React,{ useContext,useState,useEffect } from 'react';
import { auth, googleProvider } from './config';

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    const logout = () => {
        return auth.signOut();
    }
    
    
const googleSignin = async () => {
    try {
      await auth.signInWithPopup(googleProvider).then(async user => {
        if(user.additionalUserInfo.isNewUser){
          // add api for create user here
        }
      })
    } 
    catch(e) {
      setErrors(e.message)
    }
}


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
    }, []);

    return (
        <AuthContext.Provider
            value = {{
                currentUser,
				googleSignin,
				
                logout,
                errors,
                setErrors
            }} 
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}
