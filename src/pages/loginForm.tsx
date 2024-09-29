import { useRef, useEffect } from "react";
import { LoginSchema, LoginSchemaType } from "../validations/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import Input from "../components/Form/UI/InputText";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCompanyProfile from "../hooks/useCompanyProfile";
import { queryClient } from "../main";
import ILoginCredentials from "../entities/User";
import Button from "../components/Button/Button";

const LoginForm = () => {
  const { data } = useCompanyProfile();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        video.currentTime = 0;
        video.play();
      };

      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const { mutate } = useAuth();

  const onSubmit = (formData: ILoginCredentials) => {
    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/dashboard");
      },
      onError: (error: Error) => {
        console.error("Login failed", error);
      },
    });
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {data && (
        <div className="absolute w-full h-full inset-0">
          <video
            ref={videoRef}
            src={data.data.video_url}
            muted
            autoPlay
            className="object-cover w-full h-full"
          />
        </div>
      )}

  
      <div className="w-full h-full absolute inset-0 z-10 bg-black/70 flex items-center justify-center ">
        <div className="w-[90%] md:w-[50%] lg:w-[30%] h-max shadow-2xl bg-white relative z-20 border rounded-lg">
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

            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-between py-10">
            <Button 
              label="Back"
              onClick={() => navigate("/")}
              className="py-2 rounded-lg text-white text-sm w-36 bg-red-800 hover:bg-orange-600/80 flex items-center justify-center gap-4"
              icon={<FaArrowLeftLong />} 
            />
            <Button 
              label="Login"
              type="submit"
              className="py-2 text-white text-sm w-36 bg-app-green hover:bg-green-500 border rounded-lg"
            />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
