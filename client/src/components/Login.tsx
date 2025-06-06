import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {

    const [user, setuser] = React.useState({
        email: "",
        password: "",
        role: ""
    });

    const [_, setCookie,] = useCookies(["authtoken", "name", "role"]);


    const host = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${host}/api/user/login`, {
                email: user.email,
                password: user.password,
                role: user.role
            })
            console.log(response.data)
            if (response.data.success == true) {
                setCookie("authtoken", response.data.token, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                });

                setCookie("name", response.data.user.name, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                });

                setCookie("role", response.data.user.role, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                });
                toast.success("Login Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate("/")
                    window.location.reload();
                }, 2000);
            }
            else if (response.data.success == false) {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 left-0 w-full h-40 animate-busMove z-0">
                    <div className="w-24 h-12 bg-yellow-400 rounded-lg shadow-lg mx-auto bus-animation"></div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-6 z-10 relative">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2 z-10 relative">
                    <div className="flex flex-col mb-4 w-full">
                        <label className="mb-1 text-sm font-semibold text-gray-700">Email</label>
                        <input onChange={handleChange} id="email" name="email" value={user.email} type="email" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label className="mb-1 text-sm font-semibold text-gray-700">Password</label>
                        <input onChange={handleChange} id="password" name="password" value={user.password} type="password" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col mb-4 w-full">
                        <label className="mb-1 text-sm font-semibold text-gray-700">Role</label>
                        <select onChange={handleChange} id="role" name="role" value={user.role} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                        Log In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign Up</Link>
                </p>

                <div className="flex items-center gap-2 my-4">
                    <hr className="flex-1 border-gray-300" />
                    <span className="text-gray-500 text-sm">OR</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                <div className="flex gap-4 justify-center">
                    <button className="p-2 bg-red-100 rounded-full hover:bg-red-200">
                        <FaGoogle className="text-red-600" />
                    </button>
                    <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                        <FaFacebookF className="text-blue-700" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <FaGithub className="text-black" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;