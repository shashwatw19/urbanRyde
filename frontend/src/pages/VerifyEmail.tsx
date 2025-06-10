import { FormEvent, useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useState } from "react";
import { useRef } from "react";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import { UserSignUpType } from "../types/userTypes";
import { signup } from "../services/operations/user/auth";
import AuthContext, { AuthDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  const {userSignupData , setUserSignupData , loading , setLoading ,setUser , user} = useContext(UserDataContext);
  const {setIsAuthenticated , setUserRole} = useContext(AuthDataContext)
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const changehandler = (value: string, index: number) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };
  const onkeydownHandler = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Backspace' && !otp[index] && index > 0)
            inputRef.current[index - 1].focus()
  }
  const submitHandler = async(e : FormEvent)=>{
        e.preventDefault()
    
    let otpString : string = ""     
    for(const digit of otp){
        if(digit.trim() === ""){
            toast.error('Please enter a complete 6-digit OTP!')
            otpString = ""
            return;
        }
        otpString += digit
    }
        
    const data: UserSignUpType = { ...user, otp: otpString }
    // api Implementation
    try{
        const response = await signup(data , setLoading);
        if(response.success){
          setIsAuthenticated(true)
          setUserRole('user')
          setUser(response.data)
          navigate('/user/home')
        }
    }catch(e){
      console.log("error in veryEmail component" , e)
    }finally{
      setOtp(["" , "" , "" , "" , "" , ""])
    }

  }
  return (
    <div className="flex justify-center md:p-8 p-4 items-center w-screen h-screen">
        <div className="flex flex-col gap-5  items-center w-full max-w-md">
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-black text-2xl font-bold">Verify Your Email</h2>
                <p className="text-sm text-gray-600 ">enter the 6 digit code sent to your email <span className="text-gray-800 underline">{userSignupData?.email}</span></p>
            </div>
            <form onSubmit={submitHandler} className="flex flex-col gap-5">
                <div className="flex flex-row gap-3 justify-center">
                    {
                        otp?.map((digit: string, index: number) => {
                            return <input disabled={loading} className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl border-2 rounded-md border-gray-400 font-normal md:font-semibold text-gray-600 focus:outline-none focus:ring-2 " type="text"
                                ref={(element) => { inputRef.current[index] = element }}
                                maxLength={1} value={digit} key={index}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => changehandler(e.target.value, index)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onkeydownHandler(index, e)} />
                        })
                    }
                </div>
                
                <button type="submit" disabled={loading} className="bg-black text-white font-semibold text-semibold rounded-md p-2 w-full">Verify</button> 
                      
                
            </form>

        </div>




    </div>
  );
};

export default VerifyEmail;
