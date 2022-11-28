import "../assets/styles/register.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string("Введите имя")
    .required("Это поле обязательно")
    .max(255, "Не длиннее 255 символов"),
  email: Yup.string("Введите почту")
    .required("Это поле обязательно")
    .max(255, "Не длинее 255 символов")
    .email("Введите валидный адрес"),
  password: Yup.string("Введите пароль")
    .required("Это поле обязательно")
    .max(255, "Не длинее 255 символов")
    .min(6, "Пароль должен быть длиннее 6 символов"),
  password_confirmation: Yup.string("Введите пароль")
    .required("Это поле обязательно")
    .max(255, "Не длинее 255 символов")
    .min(6, "Пароль должен быть длиннее 6 символов")
    .oneOf([Yup.ref("password")], "Пароли не совподают"),
});

export default function Register() {
  const [errors, setErrors] = useState([]);
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
    <div className="container">
      <h2 className="register__heading">Регистрация</h2>

      {errors.length > 0 && <div className="register__errors">{errors}</div>}

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
              <label>Имя</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
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
            <div className="form__item">
              <label>Подтвердите пароль</label>
              <Field type="password" name="password_confirmation" />
              <ErrorMessage name="password_confirmation" component="div" />
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
        Есть аккаунт? <Link to="/login">Войдите!</Link>
      </p>
    </div>
  );
}
