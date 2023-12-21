import { Link } from "react-router-dom";

import BGPattern from "../../assets/images/pattern-dark.20747baf.svg";
import Lottie from "lottie-react";

import LoginLottie from "./login-lottie.json";
import ContinueWithSM from "./ContinueWithSM";
import { useState } from "react";
const Register = () => {
  const [confirmPass, setConfirmPass] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.profile_pic.files[0]

    const passwordConfimation = password === confirmPass;
    if (!passwordConfimation) {
      return setErrorMessage("Password doesn't match");
    } else if (!/^(.{6,})$/.test(password)) {
      return setErrorMessage("Password must be at least 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      return setErrorMessage(
        "Password must contain at least one capital letter"
      );
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return setErrorMessage(
        "Password must contain at least one special character"
      );
    } else {
      setErrorMessage("");
    }


    const formData = new FormData()
    formData.append("image", photo)


    console.log(photo);

  };

  return (
    <section
      style={{
        background: `url(${BGPattern})`,
      }}
    >
      <div className="container mx-auto px-5 py-20">
        <div className="flex items-center justify-center">
          <div className="w-2/5 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="px-6 py-4">
              <div className="text-center">
                <span className="font-bold text-2xl">Task M.</span>
              </div>

              <h3 className="text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                Create Account
              </h3>

              <div className="divider text-sm">Login With Email</div>

              {errorMessage && (
                <div className="mt-8 bg-error p-2 text-black">
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleRegister}>
                <div className="w-full mt-4">
                  <input
                    className="input-field"
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="w-full mt-4">
                  <input
                    className="input-field"
                    type="file"
                    name="profile_pic"
                  />
                </div>
                <div className="w-full mt-4">
                  <input
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    required
                  />
                </div>

                <div className="w-full mt-4">
                  <input
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    required
                  />
                </div>
                <div className="w-full mt-4">
                  <input
                    className="input-field"
                    type="password"
                    name="password_confirm"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">
                    Forget Password?
                  </span>

                  <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign In
                  </button>
                </div>
              </form>

              <ContinueWithSM />
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-200">
                Have an account?{" "}
              </span>

              <Link
                to="/login"
                className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
              >
                Login
              </Link>
            </div>
          </div>

          <Lottie
            className="hidden md:block w-2/5"
            animationData={LoginLottie}
            loop={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
