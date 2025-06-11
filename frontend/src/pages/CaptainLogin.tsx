import { CaptainSignInSchema } from "../schema/CaptainSchema"
import { captainSignInSchema } from "../schema/CaptainSchema"
import { useContext, useState } from "react"
import { ChangeEvent , FormEvent } from "react"
import { captainLogin } from "../services/operations/captain/captainAuth"
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from "../context/UserContext"
import { AuthDataContext } from "../context/AuthContext"

const CaptainLogin = () => {
  const [input , setInput] = useState<CaptainSignInSchema>({
    email : "",
    password : ""
  })
  const navigate = useNavigate()
  const [error , setErrors] = useState<Partial<CaptainSignInSchema>>({})
  const changeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
      const {name , value} = e.target
      setInput({
        ...input , [name] : value
      })
  }
  
  const {loading , setLoading , setUser} = useContext(UserDataContext)
  const {setIsAuthenticated , setUserRole , setAuthLoading} = useContext(AuthDataContext)
  const handleSubmit = async(e : FormEvent)=>{
    e.preventDefault();
    const result = captainSignInSchema.safeParse(input);

    if(!result.success){
        const fieldError = result.error.formErrors.fieldErrors;
        setErrors(fieldError as Partial<CaptainSignInSchema>)
        return ;
    }
    try{
      const response = await captainLogin(input , setLoading)
      if(response.success){
        setIsAuthenticated(true)
        setUser(response.data)
        setAuthLoading(false)
        setUserRole('captain')
        navigate("/captain/home")
      }
    }catch(e){
      console.log("error occurred in signin component" , e)
    }finally{
        setErrors({
          email : "",
          password : ""
        })
    }
  }
  return (
    <div className="p-7 flex flex-col justify-between  items-start min-h-screen">
      <h1 className="text-black md:text-4xl text-4xl ">URBANRYDE</h1>
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
        
        <button className="bg-green-600 rounded-full font-semibold mb-7 px-4 py-2 border w-full text-white " type="submit" disabled={loading}>Login </button>
        <p className="text-xm text-center font-medium">New here?<Link to={"/captain-signup"}><span className="text-blue-600"> Create a new Account</span></Link> </p>
      </form>
      <Link to={"/signin"} className="bg-black max-w-xl mx-auto rounded-full text-center font-semibold mb-7 px-4 py-2 border w-full text-white ">
          Sign in as User
      </Link>
    </div>
  )
}

export default CaptainLogin