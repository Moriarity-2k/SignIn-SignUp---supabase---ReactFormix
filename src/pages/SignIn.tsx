import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/SupabaseValidations";

// Interface representing the sign-up form
interface SignUp {
    email: string;
    password: string;
}

export default function SignIn() {
    // Configuration for the form using the @adimis/react-formix library
    const schemaFormProps: ISchemaFormProps<SignUp> = {
        formLabel: "ReactFormix Form Submission Demo",
        formSlug: "example-barebone-form",
        persistFormResponse: "localStorage",
        devTools: true,
        formDisabled: false,
        enableConditionalRendering: true,
        schema: [
            // Schema for the email field
            {
                key: "email",
                label: "Email",
                description: "Enter your email address.",
                autoComplete: "email",
                type: "email",
                placeholder: "Your email",
                defaultValue: "",
                // zod Validation rules for the email field
                validations: z
                    .string()
                    .email("Enter a valid email address")
                    .min(1, "Email is required"),
                // Custom render function for the email input
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
            // Schema for the password field
            {
                key: "password",
                label: "Password",
                description: "Enter a strong password.",
                autoComplete: "new-password",
                type: "password",
                placeholder: "minimum length of 8",
                defaultValue: "",

                // zod Validation rules for the password field
                validations: z
                    .string()
                    .min(8, "Password should be at least 8 characters")
                    .max(20, "Password must not exceed 20 characters"),
                // Custom render function for the password input
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
        ],
        defaultValues: {},

        // Callback function for form submission
        onSubmit: (values) => {
            // Call function to sign in with email and password
            signInWithEmail(values.email, values.password);
        },

        // Callback function for invalid form submission
        onInvalidSubmit: (values) => {
            console.log(
                "On Submit Invalid Example Form Response: ",
                JSON.stringify(values, null, 4)
            );
            console.log(values);
        },
    };

    return (
        <ThemeProvider defaultTheme="light">
            <FormixFormProvider {...schemaFormProps}>
                {/* Form components */}
                <FormBody>
                    <FormHeader className="flex w-[80%] max-sm:w-full mx-auto">
                        {/* Header components */}
                        <FormTitle className=" leading-8 uppercase tracking-widest" />
                        <FormDescription />
                    </FormHeader>
                    <FormContent className="flex w-[80%] max-sm:w-full mx-auto">
                        {/* Dynamic Content  */}
                        <FormFlexFields fluid columns={1} className="w-full" />
                    </FormContent>
                    <FormFooter className="w-[80%] max-sm:w-full mx-auto">
                        {/* Footer  */}
                        <Button type="submit" className="mt-5">
                            Submit
                        </Button>
                    </FormFooter>
                </FormBody>
            </FormixFormProvider>
        </ThemeProvider>
    );
}
