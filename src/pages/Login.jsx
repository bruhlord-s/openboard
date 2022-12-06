import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignForm from "../components/sign-form/SignForm";

const validationSchema = Yup.object({
  email: Yup.string("Enter email")
    .required("This field is required")
    .max(255, "Shorter than 255 characters")
    .email("Enter valid email"),
  password: Yup.string("Enter password")
    .required("This field is required")
    .max(255, "Shorter than 255 characters")
    .min(6, "Password must be longer than 6 characters"),
});

export default function Login() {
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    axios
      .post("http://localhost:8000/api/login", values)
      .then((res) => {
        setIsSubmitting(false);
        localStorage.setItem("auth_token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors([err.response.data.message]);
        } else {
          setErrors(["Something went wrong"]);
        }
        setIsSubmitting(false);
      });
  };

  return (
    <SignForm title={"Sign In"} errors={errors}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="register__form form">
            <div className="form__item">
              <label>Email</label>
              <Field
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="form__item">
              <label>Password</label>
              <Field type="password" name="password" placeholder="●●●●●●●●" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className="form__submit">Sign In</div>
            <p className="another">
              First time here?{" "}
              <Link className="another__link" to="/register">
                Sign up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </SignForm>
  );
}
