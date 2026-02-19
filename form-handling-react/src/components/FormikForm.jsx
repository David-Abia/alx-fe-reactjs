import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Username required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        alert("Formik form submitted");
        resetForm();
      }}
    >
      <Form className="space-y-4 max-w-md mx-auto">

        <div>
          <Field
            name="username"
            placeholder="Username"
            className="border p-2 w-full"
          />
          <ErrorMessage name="username" component="p" className="text-red-500" />
        </div>

        <div>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
          />
          <ErrorMessage name="email" component="p" className="text-red-500" />
        </div>

        <div>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
          />
          <ErrorMessage name="password" component="p" className="text-red-500" />
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>

      </Form>
    </Formik>
  );
}
