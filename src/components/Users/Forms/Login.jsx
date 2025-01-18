import { useEffect, useState } from "react";
import bgImage from "./form.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
const Login = () => {
  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //---Destructuring---
  const { email, password } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(formData));
  };

  //select store data
  const { loading, error, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  useEffect(() => {
    if (userInfo?.userFound) {
      window.location.href = "/dashboard";
    }
  }, [userInfo, dispatch]);
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
        }}
        className="py-20 overflow-x-hidden"
      >
        <div className="relative container px-4 mx-auto">
          <div className="absolute inset-0  my-24 -ml-4" />
          <div className="relative flex flex-wrap ">
            <div className="w-full md:w-4/6 px-4">
              <div className="lg:max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
                <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                  Login to your account
                </h3>
                <p className="mb-10 font-semibold font-heading">
                  Happy to see you again
                </p>
                {/* error */}
                {error && <ErrorMsg message={error.message} />}
                <form
                  className="flex flex-wrap -mx-4"
                  onSubmit={onSubmitHandler}
                >
                  <div className="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                    <label>
                      <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                        Your Email
                      </h4>
                      <input
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="email"
                        placeholder="Please enter your registered email"
                      />
                    </label>
                  </div>
                  <div className="w-full md:w-1/2 px-4 mb-12">
                    <label>
                      <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                        Password
                      </h4>
                      <input
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="password"
                        placeholder="Please enter your password"
                      />
                    </label>
                  </div>

                  <div className="w-full px-4">
                    {loading ? (
                      <LoadingComponent />
                    ) : (
                      <button className="mt-12 md:mt-16 bg-transparent border border-black hover:border-green-400 hover:text-green-400 text-black font-bold font-heading py-5 px-8 rounded-md uppercase">
                        Login
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div
              className="w-full md:w-2/6 h-128 md:h-auto flex items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat"
              style={{
                backgroundImage: ` url(${bgImage})`,
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
