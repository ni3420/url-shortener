import { useForm } from "react-hook-form";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {z} from "zod"
import { loginSchema } from "../../schema/schema";
import axios from "axios";

type LoginValues=z.infer<typeof loginSchema>
const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
  try {
    const res = await axios.post("/api/auth/sign-in", data);
    
    if (res.data.success) {
      console.log("Login successful:", res.data.message);
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || "An unexpected error occurred.";
      console.error("Backend Error Message:", errorMessage);
    } else if (error.request) {
      console.error("Network Error: No response received from server.");
    } else {
      console.error("Error setting up login request:", error.message);
    }
  }
};

  const handleSocialLogin = (provider:string) => {
    console.log(`OAuth logging in via ${provider}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-100 px-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-sm p-6 md:p-8 shadow-xl"
      >
        <legend className="fieldset-legend text-xl font-bold self-center mb-2">Welcome Back</legend>

        <div className="form-control w-full">
          <label className="label font-medium text-sm">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address format",
              },
            })}
          />
          {errors.email && (
            <span className="text-xs text-error mt-1 pl-1">{errors.email.message}</span>
          )}
        </div>

        <div className="form-control w-full mt-3">
          <label className="label font-medium text-sm">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <span className="text-xs text-error mt-1 pl-1">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-neutral w-full mt-6">
          Sign In
        </button>

        <div className="divider text-xs uppercase opacity-50 my-6">Or continue with</div>

        <div className="flex gap-4 w-full">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="btn btn-outline flex-1 gap-2 border-base-300 hover:bg-base-300"
          >
            <FaGoogle className="text-error size-4" />
            <span className="text-xs font-semibold">Google</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin("GitHub")}
            className="btn btn-outline flex-1 gap-2 border-base-300 hover:bg-base-300"
          >
            <FaGithub className="size-4" />
            <span className="text-xs font-semibold">GitHub</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;