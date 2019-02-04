import React, {Component} from 'react'
import './Navigation.css'

class Navigation extends Component{
    render(){
        const {onRouteChangeSignout, onRouteChangeSignin, onRouteChangeRegister, isSignedIn} = this.props;
        const component = isSignedIn
                            ?   <nav>
                                    <p onClick={onRouteChangeSignout}
                                        className='f3 link dim black underline pa3 pointer'>
                                        Sign Out
                                    </p>
                                </nav>
                            
                            :    <nav>                        
                                    <p onClick={onRouteChangeSignin}
                                        className='f3 link dim black underline pa3 pointer'>
                                        Sign In
                                    </p>

                                    <p onClick={onRouteChangeRegister}
                                        className='f3 link dim black underline pa3 pointer'>
                                        Register
                                    </p>
                                </nav>
        return(component);
    }
}

export default Navigation;