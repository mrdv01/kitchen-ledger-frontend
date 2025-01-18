import { useEffect, useState } from "react";
import bgImage from "./form.svg";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";

const RegisterForm = () => {
  //dispatch
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const { fullname, username, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(registerUserAction({ fullname, username, email, password }));
  };

  const { loading, error, user } = useSelector((state) => state?.users);

  useEffect(() => {
    if (user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <>
      <section className="relative overflow-x-hidden">
        <div
          style={{
            background:
              "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
          }}
          className="container px-4 mx-auto"
        >
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-2/6 px-4 mb-12 lg:mb-0">
              <div className="py-20 text-center">
                <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                  Signing up with social is super quick
                </h3>
                {/* errr */}
                {/* Error */}
                {error && <ErrorMsg message={error.message} />}
                <p className="mb-10">Please, do not hesitate</p>
                <form onSubmit={onSubmitHandler}>
                  <input
                    name="fullname"
                    value={fullname}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    name="username"
                    value={username}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="text"
                    placeholder="Username"
                    required
                  />
                  <input
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                  <input
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <button className="mt-12 md:mt-16 bg-transparent border border-black hover:border-green-400 hover:text-green-400 text-black font-bold font-heading py-5 px-8 rounded-md uppercase">
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden lg:block lg:absolute top-0 bottom-0 right-0 lg:w-3/6 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: ` url(${bgImage})`,
          }}
        />
      </section>
    </>
  );
};

export default RegisterForm;
