"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Github, Google } from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        Swal.fire({
          title: "Login Failed",
          text: res.error,
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      } else {
        Swal.fire({
          title: "Login Successful",
          text: "Redirecting to dashboard...",
          icon: "success",
          confirmButtonColor: "#dc2626",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = res?.url || "/dashboard";
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to login with Google",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4"
    >
      <motion.div
        variants={variants}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-red-100 mt-2">Login Untuk Melanjutkan</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukan Email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-red-500" />
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukan Password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : <>Login</>}
            </motion.button>
          </form>

          <div className="mt-4">
            <div className="my-2">
              <p className="text-center text-gray-600 text-sm">
                Belum punya akun?{" "}
                <Link href="/register">
                  <span className="font-medium text-red-600 hover:underline">
                    Register
                  </span>
                </Link>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                 Atau Login Dengan
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-300 cursor-pointer"
              >
                <Image
                  src="/google.svg"
                  alt="Google Logo"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
