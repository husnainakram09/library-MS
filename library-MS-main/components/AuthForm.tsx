"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";
import { useState } from "react";
import Loader from "./shared/Loader";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setLoading(true);
    const result = await onSubmit(data);

    if (result.success) {
      toast.success(
        isSignIn
          ? "You have successfully signed in"
          : "You have successfully signed up",
      );
      router.push("/");
    } else {
      toast.error(result.error ?? "An error occured");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome Back to BookNest" : "Creat an account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        accept="image/*"
                        placeholder="Upload your ID"
                        folder="image_id"
                        variant="dark"
                        type="image"
                        onFileChange={field.onChange}
                        value={field.value}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        placeholder={field.name}
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" disabled={loading} className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
            {loading && <Loader />}
          </Button>
        </form>
      </Form>

      <p className="text base text-center font-medium">
        {isSignIn ? "New to BookNest? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign In"}
        </Link>
      </p>
      {isSignIn && (
        <p className="my-0 text-xs italic text-green-200">
          <span className="font-bold">{/**Note:*/}</span> {/*You can use the default
          credentials for admin access*/}
        </p>
      )}
    </div>
  );
};

export default AuthForm;
