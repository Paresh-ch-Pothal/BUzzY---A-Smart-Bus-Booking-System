import React, { useState } from "react";
import { BusFront, MapPin, Calendar, IndianRupee, Users, Settings, Clock } from "lucide-react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface AddBusForm {
    name: string;
    busNo: string;
    Ac_NonACtype: "Ac" | "NON_AC";
    source: string;
    destination: string;
    noOfSleeper: number;
    noOfSeater: number;
    SleeperPrice: number;
    SeaterPrice: number;
    arrivalTime: string;
    departureTime: string;
    departureDate: string;
    arrivalDate: string

}

const AddBus: React.FC = () => {
    const [bus, setBus] = useState<AddBusForm>({
        name: "",
        busNo: "",
        Ac_NonACtype: "Ac",
        source: "",
        destination: "",
        noOfSleeper: 0,
        noOfSeater: 0,
        SleeperPrice: 0,
        SeaterPrice: 0,
        arrivalTime: "",
        departureTime: "",
        departureDate: "",
        arrivalDate: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBus({
            ...bus,
            [name]: name.includes("noOf") || name.includes("Price")
                ? Number(value) || 0
                : value,
        });
    };

    const [authCookie] = useCookies(["authtoken"])

    const token = authCookie.authtoken

    const host = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsSubmitting(true)
            const response = await axios.post(`${host}/api/bus/addBus`, {
                name: bus.name,
                busNo: bus.busNo,
                Ac_NonACtype: bus.Ac_NonACtype,
                source: bus.source,
                destination: bus.destination,
                noOfSleeper: bus.noOfSleeper,
                noOfSeater: bus.noOfSeater,
                SleeperPrice: bus.SleeperPrice,
                SeaterPrice: bus.SeaterPrice,
                arrivalTime: bus.arrivalTime,
                departureTime: bus.departureTime,
                departureDate: bus.departureDate,
                arrivalDate: bus.arrivalDate

            }, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": token
                }
            }
            )
            console.log(response)
            if (response.data.success) {
                setIsSubmitting(false);
                toast.success("🚌 Bus Added Successfully", {
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
            const errorMessage = error.response?.data?.message
            setIsSubmitting(false)
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
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 md:p-6"
        >
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
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 space-y-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-indigo-100 rounded-full">
                                <BusFront className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Add New Bus
                            </h1>
                        </div>
                        <p className="text-gray-600 text-lg">Fill in the details to register a new bus</p>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Bus Basic Info */}
                        <InputField
                            label="Bus Name"
                            name="name"
                            value={bus.name}
                            onChange={handleChange}
                            placeholder="Enter bus name"
                            icon={<BusFront className="w-5 h-5" />}
                            required
                        />

                        <InputField
                            label="Bus Number"
                            name="busNo"
                            value={bus.busNo}
                            onChange={handleChange}
                            placeholder="Enter bus number"
                            icon={<Settings className="w-5 h-5" />}
                            required
                        />

                        <SelectField
                            label="Bus Type"
                            name="Ac_NonACtype"
                            value={bus.Ac_NonACtype}
                            onChange={handleChange}
                            options={[
                                { label: "AC Bus", value: "Ac" },
                                { label: "Non-AC Bus", value: "NON_AC" },
                            ]}
                            required
                        />

                        {/* Route Info */}
                        <InputField
                            label="Source City"
                            name="source"
                            value={bus.source}
                            onChange={handleChange}
                            placeholder="Enter source city"
                            icon={<MapPin className="w-5 h-5" />}
                            required
                        />

                        <InputField
                            label="Destination City"
                            name="destination"
                            value={bus.destination}
                            onChange={handleChange}
                            placeholder="Enter destination city"
                            icon={<MapPin className="w-5 h-5" />}
                            required
                        />

                        {/* Seat Configuration */}
                        <InputField
                            label="Sleeper Seats"
                            name="noOfSleeper"
                            type="number"
                            value={bus.noOfSleeper}
                            onChange={handleChange}
                            placeholder="0"
                            icon={<Users className="w-5 h-5" />}
                            min={0}
                        />

                        <InputField
                            label="Seater Seats"
                            name="noOfSeater"
                            type="number"
                            value={bus.noOfSeater}
                            onChange={handleChange}
                            placeholder="0"
                            icon={<Users className="w-5 h-5" />}
                            min={0}
                        />

                        {/* Pricing */}
                        <InputField
                            label="Sleeper Price (₹)"
                            name="SleeperPrice"
                            type="number"
                            value={bus.SleeperPrice}
                            onChange={handleChange}
                            placeholder="0"
                            icon={<IndianRupee className="w-5 h-5" />}
                            min={0}
                        />

                        <InputField
                            label="Seater Price (₹)"
                            name="SeaterPrice"
                            type="number"
                            value={bus.SeaterPrice}
                            onChange={handleChange}
                            placeholder="0"
                            icon={<IndianRupee className="w-5 h-5" />}
                            min={0}
                        />

                        {/* Schedule */}
                        <InputField
                            label="Departure Date"
                            name="departureDate"
                            type="date"
                            value={bus.departureDate}
                            onChange={handleChange}
                            icon={<Calendar className="w-5 h-5" />}
                            required
                        />

                        <InputField
                            label="Arrival Date"
                            name="arrivalDate"
                            type="date"
                            value={bus.arrivalDate}
                            onChange={handleChange}
                            icon={<Calendar className="w-5 h-5" />}
                            required
                        />

                        <InputField
                            label="Arrival Time"
                            name="arrivalTime"
                            type="time"
                            value={bus.arrivalTime}
                            onChange={handleChange}
                            icon={<Clock className="w-5 h-5" />}
                            required
                        />

                        <InputField
                            label="Departure Time"
                            name="departureTime"
                            type="time"
                            value={bus.departureTime}
                            onChange={handleChange}
                            icon={<Clock className="w-5 h-5" />}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                } text-white`}
                        >
                            {isSubmitting ? "Adding Bus..." : "Add Bus"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    icon,
    placeholder,
    required = false,
    min,
}: {
    label: string;
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    min?: number;
}) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 z-10">
                    {icon}
                </div>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={min}
                className={`w-full ${icon ? "pl-12" : "pl-4"
                    } pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400`}
            />
        </div>
    </div>
);

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string; value: string }[];
    required?: boolean;
}) => (
    <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-gray-800"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

export default AddBus;