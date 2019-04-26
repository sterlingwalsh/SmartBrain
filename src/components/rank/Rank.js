import React, {Component} from 'react'
// import './Rank.css'

class Rank extends Component{
    render(){
        const { name, entries, rank} = this.props.user;
        return(
            <div>
                <div className='white f3'>
                    {`${name}, you have submitted ${entries} images. Your current rank is`}
                </div>
                <div className='white f1'>
                    {`#${rank}`}
                </div>
            </div>
        );
    }
}

export default Rank;