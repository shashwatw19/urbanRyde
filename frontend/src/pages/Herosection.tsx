import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <div>
        <div className="h-screen pt-4 bg-bottom bg-cover bg-[url(https://images.unsplash.com/photo-1674705046614-bede578a9b74?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between items-start flex-col w-full bg-red-400">
                <h1 className="font-extrabold text-white text-5xl md:text-8xl">URBANRYDE</h1>
                <div className="bg-white py-4 px-4 w-full flex gap-3 flex-col ">
                    <p className="text-2xl font-bold p-2">Get Started with URBANRYDE</p>
                    <Link to={"/signin"} className="text-white w-full md:w-24 text-center bg-black rounded-full px-3 py-2">Continue</Link>
                </div>
        </div>
    </div>
  )
}

export default HeroSection