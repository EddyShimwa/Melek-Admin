import { LoginSchema, LoginSchemaType } from "../../../validations/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import Input from "../UI/InputText";
import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "react-query";
// import { LoginData } from "../../../../@types/props";  // Use this instead of IUser
import useAuth from "../../../hooks/useAuth";
import useCompanyProfile from "../../../hooks/useCompanyProfile";
import { queryClient } from "../../../main";

const LoginForm = () => {
  const { data } = useCompanyProfile();
  console.log(data);

  // const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending, isError } = useAuth();

  // Handle form submission
  const onSubmit = (formData: LoginSchemaType) => {
    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate("/dashboard");
      },
      onError: (error: Error) => {
        console.error("Login failed", error);
      },
    });
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-app-green">
      <div className="w-[90%] md:w-[50%] lg:w-[30%] h-max shadow-xl bg-white">
        <div className="flex items-center justify-center gap-3 px-5 pt-10">
          <h2 className="text-lg font-medium text-gray-600">Welcome Back!</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-10 overflow-hidden">
          <h3 className="text-xl font-bold my-4">Sign In</h3>
          <Input
            type="email"
            placeholder="Email Address"
            register={register}
            name="email"
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            register={register}
            name="password"
            error={errors.password}
          />

          {isError && (
            <p className="text-red-500">Login failed. Please try again.</p>
          )}

          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-between py-10">
            <button
              onClick={() => navigate("/")}
              className="py-2 text-white text-sm w-36 bg-red-800 hover:bg-orange-600/80 flex items-center justify-center gap-4"
            >
              <FaArrowLeftLong />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="py-2 text-white text-sm w-36 bg-app-green hover:bg-green-500"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
