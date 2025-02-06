import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/login", data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        toast.success("Login successful! Welcome back.");
        navigate("/");
      } else {
        toast.error(
          res.data.message || "Unexpected response. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl uppercase font-semibold text-center mb-8 text-white">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-300 font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-4 py-2 bg-gray-700 text-white border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none `}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-300 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`w-full px-4 py-2 bg-gray-700 text-white border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none `}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-medium py-2 rounded-lg hover:bg-gray-950 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-gray-300 underline hover:underline transition duration-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
