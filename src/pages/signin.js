
import React from 'react';
import { useAuth } from '../firebase';

const Signin = () => {
    const { googleSignin, } = useAuth();
    

    return (
        <div
            style={{
                height:'100vh',
                width:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <h1>Signin</h1>
                or
			<button onClick={googleSignin} > google Signin </button>

        </div>
    );
};

export default Signin;
