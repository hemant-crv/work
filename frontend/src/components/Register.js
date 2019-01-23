import React, {Component} from 'react';
import axios from 'axios';


class Register extends Component{

    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        if (this.validateForm()) {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/users/register', user).then(res => {
                let errors = {};
                errors["emailid"]=res.data.email;
                this.setState({
                    errors: errors
                  });   
              }
        );
        
    }
    console.log(this.state);
}

    handleInputChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    validateForm(){
        let errors ={};
        let formIsValid = true;
        if(!this.state.name){
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }
        if (!this.state.email) {
            formIsValid = false;
            errors["emailid"] = "*Please enter your email-ID.";
          }
    
         
          if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
          }
          
          if (this.state.password.length<6) {
            formIsValid = false;
            errors["password"] = "*password must be at least 6 characters";
          }
          
    
          this.setState({
            errors: errors
          });
          return formIsValid;
    
    
    }
    render() {
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit } method="post" action="/api/users/register" >
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                     <div className="errorMsg">{this.state.errors["name"]}</div>
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                     <div className="errorMsg">{this.state.errors["emailid"]}</div>
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    <div className="errorMsg">{this.state.errors["password"]}</div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}
export default Register;