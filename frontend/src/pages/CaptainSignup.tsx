import { CaptainSignUpSchema } from "../schema/CaptainSchema"
import { captainSignUpSchema } from "../schema/CaptainSchema"
import { useState } from "react"
import { ChangeEvent , FormEvent } from "react"
import { Link } from "react-router-dom"

const CaptainSignup = () => {
      const [input, setInput] = useState<CaptainSignUpSchema>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    color : "",
    vehicleType : 'car',
    numberPlate : "",
    capacity : 4
  });
  const [error, setErrors] = useState<Partial<CaptainSignUpSchema>>({});
  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = captainSignUpSchema.safeParse(input);

    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<CaptainSignUpSchema>);
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
    <div className="p-7 flex flex-col justify-between gap-10 items-start min-h-screen">
      <h1 className="text-black md:text-4xl text-4xl ">URBANRYDE</h1>

      <form
        onSubmit={handleSubmit}
        className="md:max-w-xl md:mt-20 mt-10 mx-auto w-full"
      >
        <div className="flex flex-col mb-7 gap-2 items-start justify-between">
          <h3 className="text-lg mb-2 font-medium ">What's yout name?</h3>
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
        <div className="flex flex-col mb-7 gap-4 items-start justify-between border border-gray-200 rounded-lg p-6 bg-[#fafbfc] shadow-sm w-full">
  <h3 className="text-xl mb-4 font-semibold text-gray-800">Register Your Vehicle</h3>
  <div className="flex flex-row gap-4 md:w-full w-full">
    <div className="w-1/2 md:w-full flex flex-col gap-2">
      <label className="text-base font-medium text-gray-700 mb-1">Vehicle Type</label>
      <select
        className="bg-[#eeeeee] px-4 py-2 w-full border border-gray-300 text-base rounded-md focus:outline-none "
        name="vehicleType"
        value={input.vehicleType}
        onChange={changeHandler}
      >
        <option value="car">Car</option>
        <option value="auto">Auto</option>
        <option value="bike">Bike</option>
      </select>
      {error.vehicleType && (
        <span className="text-red-500 text-sm">{error.vehicleType}</span>
      )}
    </div>
    <div className="w-1/2 md:w-full flex flex-col gap-2">
      <label className="text-base font-medium text-gray-700 mb-1">Number Plate</label>
      <input
        className="bg-[#eeeeee] px-4 py-2 w-full border border-gray-300 text-base rounded-md focus:outline-none "
        onChange={changeHandler}
        type="text"
        name="numberPlate"
        value={input.numberPlate}
        placeholder="e.g. MP09-XXXXXX"
      />
      {error.numberPlate && (
        <span className="text-red-500 text-sm">{error.numberPlate}</span>
      )}
    </div>
  </div>
  <div className="flex flex-row gap-4 md:w-full w-full mt-2">
    <div className="w-1/2 md:w-full flex flex-col gap-2">
      <label className="text-base font-medium text-gray-700 mb-1">Colour</label>
      <input
        className="bg-[#eeeeee] px-4 py-2 w-full border border-gray-300 text-base rounded-md focus:outline-none "
        onChange={changeHandler}
        type="text"
        name="color"
        value={input.color}
        required
        placeholder="e.g. Red, White, Black"
      />
      {error.color && (
        <span className="text-red-500 text-sm">{error.color}</span>
      )}
    </div>
    <div className="w-1/2 md:w-full flex flex-col gap-2">
      <label className="text-base font-medium text-gray-700 mb-1">Capacity</label>
      <input
        className="bg-[#eeeeee] px-4 py-2 w-full border border-gray-300 text-base rounded-md focus:outline-none  "
        onChange={changeHandler}
        type="number"
        name="capacity"
        value={input.capacity}
        placeholder="e.g. 4"
        min={1}
      />
      {error.capacity && (
        <span className="text-red-500 text-sm">{error.capacity}</span>
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
        to={"/captain-signup"}
        className="bg-black max-w-xl mx-auto rounded-full text-center font-semibold mb-7 px-4 py-2 border w-full text-white "
      >
        Sign up as User
      </Link>
    </div>
  );
}

export default CaptainSignup