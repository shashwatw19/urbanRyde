import { Link, useNavigate } from "react-router-dom"
import { userSignInSchema, UserSignInSchema } from "../schema/UserSchema"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { signin } from "../services/operations/user/auth"
import { UserDataContext } from "../context/UserContext"
import { AuthDataContext } from "../context/AuthContext"
const Signin = () => {
  const [input , setInput] = useState<UserSignInSchema>({
    email : "",
    password : ""
  })
  const navigate = useNavigate();
  const {loading , setLoading  , setUser   } = useContext(UserDataContext)
  const {setIsAuthenticated , setUserRole} = useContext(AuthDataContext)
  const [error , setErrors] = useState<Partial<UserSignInSchema>>({})
  const changeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
      const {name , value} = e.target
      setInput({
        ...input , [name] : value
      })
  }
  const handleSubmit = async(e : FormEvent)=>{
    e.preventDefault();
    const result = userSignInSchema.safeParse(input);

    if(!result.success){
        const fieldError = result.error.formErrors.fieldErrors;
        setErrors(fieldError as Partial<UserSignInSchema>)
        return ;
    }
    try{
      const response = await signin(input , setLoading)
      if(response.success){
        setIsAuthenticated(true)
        setUser(response.data)
        setUserRole('user')
        navigate('/user/home')
      }
    }catch(e){
        console.log("error in signin component" , e)
    }finally{
      setErrors({
      email : "",
      password : ""
    })
    }   
  }
  return (
    <div className="p-7 flex flex-col justify-between  items-start min-h-screen">
      <h1 className="text-black md:text-4xl text-4xl ">UrbanRyde</h1>
      <form onSubmit={handleSubmit} className="md:max-w-xl md:mt-20 mx-auto w-full">
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">What's yout email?</h3>
        <input className="bg-[#eeeeee] px-4 py-2  border w-full text-base placeholder::text-base rounded-md" onChange={changeHandler} type="text" name="email" value={input.email} required placeholder="email@example.com"/>
        {
          error && <span className="text-red-500 text-sm">{error.email}</span>
        }
        </div>
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">Enter Password</h3>
        <input className="bg-[#eeeeee]  px-4 py-2 border w-full text-base placeholder::text-base rounded-md" onChange={changeHandler} name="password" value={input.password} required placeholder="password"  type="password" ></input> 
        {
          error && <span className="text-red-500 text-sm">{error.password}</span>
        }
        </div>
        
        <button className="bg-black rounded-full font-semibold mb-7 px-4 py-2 border w-full text-white " type="submit" >Login</button>
        <p className="text-xm text-center font-medium">New here?<Link to={"/signup"}><span className="text-blue-600"> Create a new Account</span></Link> </p>
      </form>
      <Link to={"/captain-signin"} className="bg-green-600 max-w-xl mx-auto rounded-full text-center font-semibold mb-7 px-4 py-2 border w-full text-white ">
          Sign in as Captain
      </Link>
    </div>
  )
}

export default Signin