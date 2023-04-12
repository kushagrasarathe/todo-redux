import { useAuth } from "@/src/context/AuthContext";
import { Notify, errorToast, successToast } from "@/src/utils/toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Button, Form, Heading, Input, Wrapper } from "@/styles/Auth.styled";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(formData.email, formData.password);
      router.push("/todo");
      // successToast("Account created successfully!");
    } catch (error) {
      // console.log(error);
      errorToast(error.message);
    }
  };

  return (
    <div>
      <Wrapper>
        <Form>
          <Heading>Create Account</Heading>
          <Input
            onChange={(e) => {
              setFormData((prevdata) => ({
                ...prevdata,
                email: e.target.value,
              }));
            }}
            placeholder="email"
            type="email"
            name="email"
            id="email"
          />
          <Input
            onChange={(e) => {
              setFormData((prevdata) => ({
                ...prevdata,
                password: e.target.value,
              }));
            }}
            placeholder="password"
            type="password"
            name="password"
            id="password"
          />
          <Button onClick={handleSignup}>Create Account</Button>
        </Form>
      </Wrapper>

      {/* <div>
        <label htmlFor="email">
          Email: <br />
        </label>
        <input
          onChange={(e) => {
            setFormData((prevdata) => ({ ...prevdata, email: e.target.value }));
          }}
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">
          Password: <br />
        </label>
        <input
          onChange={(e) => {
            setFormData((prevdata) => ({
              ...prevdata,
              password: e.target.value,
            }));
          }}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button onClick={handleSignup}>SignUp</button> */}
      <Notify />
    </div>
  );
}
