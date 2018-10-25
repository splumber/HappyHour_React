import React, { Component } from "react"; //must also specify component up top to get it for inheritance
import ArrayNameMap from './ArrayNameMap';
import someArray from './someArray';

//extends is calling super so that's your thing. This is the React shorthand for class inheritance
class About extends Component{
state = {
  myState: '',
  name: ''
}

//you can get destructure errors when you don't write them with curlies lel
//event.target is the same thing as onClick except it's onChange for this element
changeStuff = event => {
  const {name, value} = event.target;

  if (value == 'a'){
    console.log('I hate that letter');
  }

  this.setState({
    [name]: value
  })
  
};



render () {
  //write your JSX code here. Need () around returns in JSX
  //make your components stateful by referencing the state and a method on them
  //If your smart component takes props and doesn't use them, it will break
  return (
    <div>
      <h1>About Me</h1>
      <p>What up pimps and players!</p>
      <form>
        <input name = 'name' value = {this.state.name} onChange = {this.changeStuff}/>
        <input name = 'name' value = {this.state.name} onChange = {this.changeStuff}/>
      </form>
      <ArrayNameMap array = {someArray}/>



    </div>


)
}

}

// const About = (props) => (
//   <div>
//     <h1>About Page</h1>
//     <p>
//       {props.text}
//     </p>
//   </div>
// );

export default About;
