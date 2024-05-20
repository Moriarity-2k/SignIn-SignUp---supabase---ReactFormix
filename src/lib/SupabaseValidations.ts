import { SignUp } from "@/pages/SignUp";
import { supabase } from "@/supabaseClient";
import toast from "react-hot-toast";

/**
 * Signs up a new user with the email and password.
 * @param email The email of the user to sign up.
 * @param password The password of the user to sign up.
 * @returns object of email , user created timestamp.
 */
export async function signUpNewUser(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		// options: {
		// 	emailRedirectTo: "https://example.com/welcome",
		// },
	});

	if (error) {
		console.log(error);
		if (error.status !== 429)
			toast.error("Server Error !!! Try again later");
	}

	console.log(data);

	return data;
}

/**
 * supabase api sign-in function
 * @param email : supabase SignIn Email
 * @param password : supabase SignIn password
 * @returns an object of email , lastAuthentication time stamp
 */
export async function signInWithEmail(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.log(error);
		if (error.status !== 429)
			return toast.error("Server Error !!! Try again later");
	}

	console.log(data);

	toast.success("Sign In !!! successfull ");

	return data;
}

/**
 * Uploads an image file to Supabase storage.
 * @param file The image file to upload.
 * @returns The result of the upload operation.
 */
export async function ImageUploader(file: File) {
	const { data, error } = await supabase.storage
		.from("Files")
		.upload(file.name.split("/").join("") + Date.now(), file, {
			cacheControl: "3600",
		});

	if (error) {
		toast.error("Server Error !!! Try again later");
		return;
	}

	console.log(data);

	return data;
}

/**
 * Interface of the supabase table row model
 */
interface ISupaBaseModel {
	username: string;
	email: string;
	phone: string;
	terms: boolean;
	gender: string;
	file: string;
	date: Date;
	year: number;
	address: string;
	expertise: string[];
}
/**
 * Inserts a single row of data into a Supabase table.
 * @param supabaseTableData The data to insert into the table.
 * @returns success message and timestamp of the insert operation.
 */
export async function supabaseSingleRow(supabaseTableData: ISupaBaseModel) {
	const { data, error } = await supabase
		.from("Users")
		.insert([supabaseTableData])
		.select();

	if (error) {
		console.log(error);
		toast.error("Server Error !!! Try again later");
		return;
	}

	console.log(data);
	toast.success("Registration successfull !!!");

	return data;
}

export const Registration = async (values: SignUp) => {
	console.log(values);

	await signUpNewUser(values.email, values.password);

	const data = await ImageUploader(values.file[0] as File);

	const imageUrl =
		import.meta.env.VITE_SUPABASE_URL +
		import.meta.env.VITE_SUPABASE_IMAGE_URL +
		data;

	const supabaseTableData = {
		username: values.username,
		email: values.email,
		phone: values.phone,
		terms: values.terms,
		gender: values.gender,
		file: imageUrl,
		date: new Date(values.date),
		year: +values.year,
		address: values.address,
		expertise: values.expertise.split(","),
	};

	supabaseSingleRow(supabaseTableData);

	/** 
     * Example data format
        username: 'User110',
        email: 'suryateja11@gmail.com',
        address: 'Ns Palya , Btm Layout 2nd stage',
        phone: '**********',
        password: 'asdfasdfasdf',
        gender: 'male',
        file: FileList {
        0: File {
            name: 'zachary-keimig-Wz-5buxsNqA-unsplash.jpg',
            lastModified: 1693333461700,
            lastModifiedDate: new Date('2023-08-29T18:24:21.000Z'),
            webkitRelativePath: '',
            size: 1430764,
            type: 'image/jpeg'
        },
        length: 1
        },
        date: '2024-05-21',
        year: '2021',
        terms: true
     */
};
