import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

function LoggedInName()
{

    const {user} = useContext(GlobalContext);


    const doLogout = event => 
    {
	    event.preventDefault();
		
        alert('doLogout');
    };    

    return(
      <div id="loggedInDiv">
        <span id="userName">Logged In As {user.name} </span><br />
        <button type="button" id="logoutButton" class="buttons" 
           onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;
