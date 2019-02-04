import React, {Component} from 'react'
import './ImageLinkForm.css'

class ImageLinkForm extends Component{
    render(){
        const { onInputChange, onButtonSubmit } = this.props;
        return(
            <div>
                <p className='f3'>
                   {'This Magic Brain will detect faces in your pictures. Give it a try.'} 
                </p>
                <div className='center'>
                    <div className='pa4 br3 shadow-5 form center'>
                        <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} defaultValue='https://previews.123rf.com/images/heckmannoleg/heckmannoleg1604/heckmannoleg160400021/54978500-beautiful-woman-face-perfect-makeup-beauty-fashion-eyelashes-cosmetic-eyeshadow-highlighting.jpg'/>
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                                onClick={onButtonSubmit}>
                            Detect
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageLinkForm;