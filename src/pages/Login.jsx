import "../assets/styles/register.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string("Введите почту")
    .required("Это поле обязательно")
    .max(255, "Не длинее 255 символов")
    .email("Введите валидный адрес"),
  password: Yup.string("Введите пароль")
    .required("Это поле обязательно")
    .max(255, "Не длинее 255 символов")
    .min(6, "Пароль должен быть длиннее 6 символов"),
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
    <div className="container">
      <h2 className="register__heading">Вход</h2>

      {errors.length > 0 && <div className="register__errors">{errors}</div>}

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
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="form__item">
              <label>Пароль</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <Button
              title="Далее"
              submit={true}
              className={"form__submit"}
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <p className="register__to-login">
        Впервые здесь? <Link to="/register">Зарегистрируйтесь!</Link>
      </p>
    </div>
  );
}
