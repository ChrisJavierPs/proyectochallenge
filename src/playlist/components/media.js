import React, { PureComponent } from 'react';
import './media.css';
import PropTypes from 'prop-types';

class Media extends PureComponent{
    state = {
    author: 'Christian Javier'
    }
/*
constructor(props){
 super(props)
 this.state = {
 author: props.author
 }
}
*/
/*
    handleClick = (event) =>{

   this.setState({
    author:'Ricardo Celis',

   });
}
*/
    render(){
    const styles={
        container:{
         color:'#44546b',
         cursor: 'pointer',
         width: 260,
         border:'1px solid red'
        }
    }
       return(
           <div className="Media" 
           onClick={this.props.handleClick}>
               <div className="Media-cover">
               <img 
               src={this.props.cover}
               alt=""
               width={240}
               height={160}
               className="Media-image"
               />
               <h3 className="Media-title">{this.props.title}</h3>
               <p className="Media-author">{this.props.author}</p>
           </div>
         </div>
       )
    }
}

Media.propTypes ={
 cover: PropTypes.string,
 title: PropTypes.string.isRequired,
 author:PropTypes.string,
 type: PropTypes.oneOf(['video','audio'])

}

export default Media;
