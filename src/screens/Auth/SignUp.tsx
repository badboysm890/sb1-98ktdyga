import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpForm = z.infer<typeof signupSchema>;

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      // Here you would normally handle user registration
      console.log("Signup data:", data);
      navigate("/login");
    } catch (err) {
      setError("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <img
              className="h-12"
              alt="Logo"
              src="public/image-168.png"
            />
          </div>
          <h1 className="text-2xl font-large text-center mb-6">Create Account</h1>
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full p-2 border rounded-md"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};