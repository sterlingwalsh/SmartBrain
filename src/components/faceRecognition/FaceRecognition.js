import React, {Component} from 'react'
// import './FaceRecognition.css'

class FaceRecognition extends Component{
    render(){
        const {imageUrl} = this.props;
        return(
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputimage' alt='iamge' src={imageUrl} width="500px" height='auto'/>
                </div>
            </div>
        );
    }
}

export default FaceRecognition;