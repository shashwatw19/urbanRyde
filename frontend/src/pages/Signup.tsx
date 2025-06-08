import { UserSignUpSchema } from "../schema/UserSchema";
import { useState } from "react";
import { userSignInSchema } from "../schema/UserSchema";
import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [input, setInput] = useState<UserSignUpSchema>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setErrors] = useState<Partial<UserSignUpSchema>>({});
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = userSignInSchema.safeParse(input);

    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<UserSignUpSchema>);
      return;
    }

    setErrors({
      email: "",
      password: "",
      firstname : "",
      lastname : ""
    });

    console.log("input from signun form", input);

    // api implemetation from here
  };
  return (
    <div className="p-7 flex flex-col justify-between  items-start min-h-screen">
      <h1 className="text-black md:text-4xl text-4xl ">URBANRYDE</h1>

      <form
        onSubmit={handleSubmit}
        className="md:max-w-xl md:mt-20 mx-auto w-full"
      >
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">What's yout name?</h3>
          <div className="flex flex-row gap-2 md:w-full">
            <div className="w-1/2 md:w-full">
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
            <div className="w-1/2 md:w-full">
              <input
                className="bg-[#eeeeee] px-4 py-2 w-full border  text-base placeholder::text-base rounded-md"
                onChange={changeHandler}
                type="text"
                name="lastname"
                value={input.lastname}
                required
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
          {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
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

        <button
          className="bg-black rounded-full font-semibold mb-7 px-4 py-2 border w-full text-white "
          type="submit"
        >
          Signup
        </button>
        <p className="text-xm text-center font-medium">
          Already have an account?
          <Link to={"/signin"}>
            <span className="text-blue-600"> signin</span>
          </Link>{" "}
        </p>
      </form>
      <Link
        to={"/captain-signup"}
        className="bg-green-600 max-w-xl mx-auto rounded-full text-center font-semibold mb-7 px-4 py-2 border w-full text-white "
      >
        Sign up as Captain
      </Link>
    </div>
  );
};

export default Signup;
