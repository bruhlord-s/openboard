import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignForm from "../components/sign-form/SignForm";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string("Enter name")
    .required("This field is required")
    .max(255, "Shorter than 255 characters"),
  email: Yup.string("Enter email")
    .required("This field is required")
    .max(255, "Shorter than 255 characters")
    .email("Enter valid email"),
  password: Yup.string("Enter password")
    .required("This field is required")
    .max(255, "Shorter than 255 characters")
    .min(6, "Password must be longer than 6 characters"),
  password_confirmation: Yup.string("Enter password")
    .required("This field is required")
    .max(255, "Shorter than 255 characters")
    .min(6, "Password must be longer than 6 characters")
    .oneOf([Yup.ref("password")], "Passwords mismatch"),
});

export default function Register() {
  const [errors, setErrors] = useState(["Something went wrong"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    axios
      .post("http://localhost:8000/api/register", values)
      .then((res) => {
        setIsSubmitting(false);
        localStorage.setItem("auth_token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(
            Object.values(err.response.data?.errors).map((error) => error[0])
          );
        } else {
          setErrors(["Something went wrong"]);
        }
        setIsSubmitting(false);
      });
  };

  return (
    <SignForm title={"Sign Up"} errors={errors}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="register__form form">
            <div className="form__item">
              <label>Name</label>
              <Field type="text" name="name" placeholder="John Doe" />
              <ErrorMessage name="name" component="div" />
            </div>
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
            <div className="form__item">
              <label>Confirm Password</label>
              <Field
                type="password"
                name="password_confirmation"
                placeholder="●●●●●●●●"
              />
              <ErrorMessage name="password_confirmation" component="div" />
            </div>

            <div className="form__submit">Sign Up</div>

            <p className="another">
              Already have an account?{" "}
              <Link className="another__link" to="/login">
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </SignForm>
  );
}
