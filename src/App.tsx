import { useState } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Button } from "./components/ui/button";
import { Toaster } from "react-hot-toast";

function App() {
	const [logIn, setLogIn] = useState<boolean>(true);

	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: "",
					duration: 5000,
					style: {
						background: "#363636",
						color: "#fff",
					},

					// Default options for specific types
					success: {
						duration: 3000,
					},
				}}
			/>
			<div className="bg-white">
				<div className="p-8 font-mono font-bold tracking-wide text-xl w-[90%] mx-auto flex items-center justify-between shadow-md">
					<div className="">
						ADIMIS{" "}
						<span className="max-sm:hidden">INTERN PROJECT</span>
					</div>
					<div>
						{logIn ? (
							<Button
								onClick={() => setLogIn(false)}
								className="text-white"
							>
								Create Account
							</Button>
						) : (
							<Button
								onClick={() => setLogIn(true)}
								className="text-white"
							>
								Sign In
							</Button>
						)}
					</div>
				</div>
				<div className="w-[90%] mx-auto my-10 bg-gray-100">
					{logIn ? <SignIn /> : <SignUp />}
				</div>
			</div>
		</>
	);
}

export default App;
