import { z } from "zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
	FormBody,
	FormContent,
	FormixFormProvider,
	FormDescription,
	FormFlexFields,
	FormFooter,
	FormHeader,
	FormTitle,
	ISchemaFormProps,
	ThemeProvider,
} from "@adimis/react-formix";
import "@adimis/react-formix/dist/style.css";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { Registration } from "@/lib/SupabaseValidations";
import toast from "react-hot-toast";

// Interface representing the data structure of the sign-up form
export interface SignUp {
	username: string;
	email: string;
	address: string;
	phone: string;
	password: string;
	gender: string;
	file: FileList;
	date: Date;
	year: string;
	expertise: string;
	terms: boolean;
}

export default function SignUp() {

	const schemaFormProps: ISchemaFormProps<SignUp> = {
		formLabel: "ReactFormix Form Submission Demo",
		formSlug: "FORMDATA",
		persistFormResponse: "localStorage",
		// persistFormResponse: defValues,
		devTools: true,
		formDisabled: false,
		enableConditionalRendering: true,

		// Schema fields for all the supaase table row fields
		schema: [
			{
				key: "username",
				label: "Username",
				description: "Enter your desired username.",
				autoComplete: "username",
				type: "text",
				// placeholder: "Your username",
				// defaultValue : 'surya',
				validations: z
					.string()
					.min(1, "Username is required")
					.max(20, "Username must not exceed 20 characters"),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "16px",
							margin: "5px 0",
						}}
						className="dark:text-white"
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "email",
				label: "Email",
				description: "Enter your email address.",
				autoComplete: "email",
				type: "email",
				placeholder: "Your email",
				defaultValue: "",
				validations: z
					.string()
					.email("Enter a valid email address")
					.min(1, "Email is required"),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "16px",
							margin: "5px 0",
						}}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "address",
				label: "Address",
				description: "Enter your complete address.",
				autoComplete: "address-line1",
				type: "text",
				placeholder: "Your address",
				defaultValue: "",
				validations: z
					.string()
					.min(10, "Address should be at least 10 characters"),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "18px",
							margin: "5px 0",
						}}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "phone",
				label: "Phone",
				description: "Enter your phone number with country code.",
				autoComplete: "tel",
				type: "tel",
				placeholder: "+1234567890",
				defaultValue: "",
				validations: z
					.string()
					.regex(/^\+?(\d.*){10,}$/, "Enter a valid phone number"),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "18px",
							margin: "5px 0",
						}}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "password",
				label: "Password",
				description: "Enter a strong password.",
				autoComplete: "new-password",
				type: "password",
				placeholder: "minimum length of 8",
				defaultValue: "",
				validations: z
					.string()
					.min(8, "Password should be at least 8 characters")
					.max(20, "Password must not exceed 20 characters"),
				displayConditions: [
					{
						dependentField: "email",
						dependentFieldValue: "admin@adimis.in",
						operator: "===",
					},
				],
				removeValidationConditions: [
					{
						dependentField: "email",
						dependentFieldValue: "admin@adimis.in",
						operator: "!==",
					},
				],
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "16px",
							margin: "5px 0",
						}}
						className="inset-0 ring-0"
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "gender",
				label: "Gender",
				description: "Please state your gender",
				type: "select",
				placeholder: "Please state Your gender",
				defaultValue: "male",
				// validations: z.enum(["male", "female", "Prefer Not to say"]), // Ensure it's one of the specified options
				validations: z.string(), // Ensure it's one of the specified options
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Select
						// type={formItem.type}
						// id={formItem.key}
						{...formMethods.register(formItem.key)}
						disabled={formDisabled || submitButtonLoading}
						defaultValue="male"
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="Prefer Not to say">
								Prefer Not to say
							</SelectItem>
						</SelectContent>
					</Select>
				),
			},
			{
				key: "file",
				label: "file",
				description: "choose an image",
				type: "file",
				// placeholder: "",
				// defaultValue: "",
				validations: z.any().refine((files) => {
					if (
						localStorage.getItem("adimis-schema-form-FORMDATA") !==
							"" ||
						localStorage.getItem("adimis-schema-form-FORMDATA") !==
							null
					)
						return true;

					if (files.length === undefined) return false;

					return files?.length !== 0;
				}, "Please provide an image for reference"),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						accept="image/*"
						type={formItem.type}
						id={formItem.key}
						className="pt-4 pb-8"
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							// padding: "20px 0",
							margin: "5px 0",
						}}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "date",
				label: "Date",
				description: "choose a date before 2025",
				type: "date",
				validations: z
					.string({
						message: "Date is a required field",
					})
					.refine((val) => {
						// console.log(+val.split("-")[0]);
						if (
							+val.split("-")[0] < 1900 ||
							+val.split("-")[0] > 2025
						)
							return false;

						return true;
					}, "Please specify some valid date"),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "16px",
							margin: "5px 0",
						}}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "year",
				label: "year",
				description: "please choose a year",
				type: "number",
				validations: z.string({
					message: "Please specify the year",
				}),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "16px",
							margin: "5px 0",
						}}
						// defaultValue={2024}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "expertise",
				label: "expertise",
				description:
					"Choose your domain skills ! Enter comma (,) separated values",
				// autoComplete: "male",
				type: "string",
				placeholder: "Enter comma seperated values",
				// defaultValue: "",
				// validations: z.array(),
				validations: z.string(),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<Input
						type={formItem.type}
						id={formItem.key}
						disabled={formDisabled || submitButtonLoading}
						style={{
							width: "100%",
							height: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
							padding: "16px",
							margin: "5px 0",
						}}
						{...formMethods.register(formItem.key)}
					/>
				),
			},
			{
				key: "terms",
				label: "Accept the terms and conditions",
				type: "checkbox",
				validations: z.boolean(),
				render: ({
					formDisabled,
					formItem,
					formMethods,
					submitButtonLoading,
				}) => (
					<div className="flex items-center gap-4">
						<input
							type={formItem.type}
							id={formItem.key}
							disabled={formDisabled || submitButtonLoading}
							{...formMethods.register(formItem.key)}
							name="terms"
							// checked={check}
							// onChange={(e) => setCheck(e.target.value === "on")}
						/>
						<label htmlFor="terms">
							Please accept the terms & conditions{" "}
						</label>
					</div>
				),
			},
		],
		// defaultValues: {
		//     username : 'us'
		//
		// },
		onSubmit: Registration,
		onInvalidSubmit: () => {
			// console.log(
			// 	"On Submit Invalid Example Form Response: ",
			// 	JSON.stringify(values, null, 4)
			// );
			// console.log(values);
			toast.error("Please provide all the values !!!");
		},
	};

	return (
		<ThemeProvider defaultTheme="light">
			<FormixFormProvider {...schemaFormProps}>
				<FormBody>
					<FormHeader className="dark:text-black lex w-[80%] max-sm:w-full mx-auto">
						<FormTitle className=" leading-8 uppercase tracking-widest" />
						<FormDescription />
					</FormHeader>
					<FormContent className="flex w-[80%] max-sm:w-full mx-auto">
						{/* <input key="file" type="file" accept="image/*" /> */}
						<FormFlexFields fluid columns={1} className="w-full" />
					</FormContent>
					<FormFooter className="w-[80%] max-sm:w-full mx-auto">
						<Button type="submit" className="mt-5">
							Submit
						</Button>
					</FormFooter>
				</FormBody>
			</FormixFormProvider>
		</ThemeProvider>
	);
}
