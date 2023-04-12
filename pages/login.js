import { useAuth } from "@/src/context/AuthContext";
import { Notify, errorToast, successToast } from "@/src/utils/toast";
import {
  Button,
  Form,
  GlobalStyle,
  Heading,
  Input,
  Wrapper,
} from "@/styles/Auth.styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      router.push("/todo");
      // successToast("Login successfull!");
    } catch (error) {
      // console.log(error);
      errorToast(error.message);
    }
  };

  return (
    <div>
      <Wrapper>
        <Form>
          <Heading>Login</Heading>
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
          <Button onClick={handleLogin}>Login</Button>
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
      <button onClick={handleLogin}>Login</button> */}
      <Notify />
    </div>
  );
}
