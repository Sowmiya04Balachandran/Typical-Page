import React, {  useState ,useReducer ,useContext} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from '../UI/Input/Input';
const Login = (props) => {
 
   
    const emailReducer=(state,action)=>{
        if(action.type==='USER_INPUT'){
            return{value:action.val,isValid:action.val.includes('@')};
        }
        if(action.type==='INPUT_BLUR'){
            return{value:state.value ,isValid:state.value.includes('@')};
        }
        return {value:'',isValid:false};
    };


    const passwordReducer=(state,action)=>{
        if(action.type==='User_Input'){
            return{value:action.val,isValid:action.val.trim().length>6};
        }
        if(action.type==='Input_Blur'){
            return{value:state.value,isValid:state.value.trim().length>6}
        }
        return {value:'',isValid:false}
};

//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState("");
//   const [passwordIsValid, setPasswordIsValid] = useState();
//   const [enteredCollegeName, setEnteredCollegeName] = useState("");
//   const [collegeNameIsValid, setCollegeNameISValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState,dispatchEmail]=useReducer(emailReducer,{
    value:'',
    isValid:false})
    const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
     value:'',
     isValid:false
    })
    const  authCtx  =useContext(AuthContext)


//   useEffect(() => {
//     setFormIsValid(
//       enteredEmail.includes("@") &&
//         enteredPassword.trim().length > 6 &&
//         enteredCollegeName.trim().length > 0
//     );
//   }, [enteredEmail, enteredPassword, enteredCollegeName]);

const {isValid:emailIsValid}=emailState;
const {isValid:passwordIsValid}=passwordState


  const emailChangeHandler = (event) => {
    // 
    dispatchEmail({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
        event.target.value.includes('@') && event.target.value.trim().length>6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'User_Input',val:event.target.value})

    setFormIsValid(
       emailState.isValid && passwordState.isValid
    );
  };

//   const collegeChangeHandler = (event) => {
//     setEnteredCollegeName(event.target.value);
//   };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);

    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({type:'Input_Blur'})
  };

//   const validateCollegeHandler = () => {
//     setCollegeNameISValid(enteredCollegeName.trim().length > 0);
//   };

  const submitHandler = (event) => {
    event.preventDefault();
   authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' 
        label="E-Mail"
         type="email" 
         isValid={emailIsValid} 
         value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>
      
        {/* /* {<div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollegeName}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}

<Input id='password' 
        label="Password"
         type="password" 
         isValid={passwordIsValid} 
         value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>
         {/* <div
          className={`${classes.control} ${
            passwordState === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>  */}

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;