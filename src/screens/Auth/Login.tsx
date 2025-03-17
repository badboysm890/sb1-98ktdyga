import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuthStore } from "../../lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login, lastRoute } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      login();
      navigate(lastRoute || '/');
    } catch (err) {
      setError("Invalid email or password");
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
          <h1 className="text-2xl font-large text-center mb-6">Login</h1>
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};