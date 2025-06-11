import { CaptainSignUpSchema } from "../schema/CaptainSchema";
import { captainSignUpSchema } from "../schema/CaptainSchema";
import { useContext, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOtp } from "../services/operations/user/auth";
import { UserDataContext } from "../context/UserContext";
import { UserSignUpSchema } from "../schema/UserSchema";
import { userSignUpSchema } from "../schema/UserSchema";
const CaptainSignup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<UserSignUpSchema>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
   
  });
  
  const { loading, setLoading, user, setUser } = useContext(UserDataContext);
  const [error, setErrors] = useState<Partial<UserSignUpSchema>>({});
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = userSignUpSchema.safeParse(input);

    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<UserSignUpSchema>);
      return;
    }
    console.log("input from signup  captain" , input)
    try {
      const response = await createOtp(input.email, setLoading);
      if (response) {
        setUser({
          email: input.email,
          password: input.password,
          fullname: {
            firstname: input.firstname,
            lastname: input.lastname || "",
          },
        });
        return navigate("/verify-email-captain");
      }
    } catch (e) {
      console.log("error in signup component", e);
    } finally {
      setErrors({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      });
    }
  };
  return (
    <div className="p-7 flex flex-col justify-between gap-10 items-start min-h-screen">
      <h1 className="text-black md:text-4xl text-4xl ">UrbanRyde</h1>

      <form
        onSubmit={handleSubmit}
        className="md:max-w-xl md:mt-20 mt-10 mx-auto w-full"
      >
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">
            What's your name captain?
          </h3>
          <div className="flex flex-row gap-2 md:w-full">
            <div className="w-1/2 md:w-full flex flex-col gap-1">
              <input
                className="bg-[#eeeeee] px-4 py-2 w-full border  text-base placeholder::text-base rounded-md"
                onChange={changeHandler}
                type="text"
                name="firstname"
                value={input.firstname}
                required
                placeholder="first name"
              />
              {error.firstname && (
                <span className="text-red-500 text-sm">{error.firstname}</span>
              )}
            </div>
            <div className="w-1/2 md:w-full flex flex-col gap-1">
              <input
                className="bg-[#eeeeee] px-4 py-2 w-full border  text-base placeholder::text-base rounded-md"
                onChange={changeHandler}
                type="text"
                name="lastname"
                value={input.lastname}
                placeholder="last name"
              />
              {error.lastname && (
                <span className="text-red-500 text-sm">{error.lastname}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">What's yout email?</h3>
          <input
            className="bg-[#eeeeee] px-4 py-2  border w-full text-base placeholder::text-base rounded-md"
            onChange={changeHandler}
            type="text"
            name="email"
            value={input.email}
            required
            placeholder="email@example.com"
          />
          {error.email && (
            <span className="text-red-500 text-sm">{error.email}</span>
          )}
        </div>
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">Enter Password</h3>
          <input
            className="bg-[#eeeeee]  px-4 py-2 border w-full text-base placeholder::text-base rounded-md"
            onChange={changeHandler}
            name="password"
            value={input.password}
            required
            placeholder="password"
            type="password"
          ></input>
          {error.password && (
            <span className="text-red-500 text-sm">{error.password}</span>
          )}
        </div>

        <button disabled={loading}
          className="bg-green-600 rounded-full font-semibold mb-7 px-4 py-2 border w-full text-white "
          type="submit"
        >
          Signup
        </button>
        <p className="text-xm text-center font-medium">
          Already have an account?
          <Link to={"/captain-signin"}>
            <span className="text-blue-600"> signin</span>
          </Link>{" "}
        </p>
      </form>
      <Link
        to={"/signup"}
        className="bg-black max-w-xl mx-auto rounded-full text-center font-semibold mb-7 px-4 py-2 border w-full text-white "
      >
        Sign up as User
      </Link>
    </div>
  );
};

export default CaptainSignup;
