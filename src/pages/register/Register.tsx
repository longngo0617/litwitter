import { Button } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextFormField } from "../../components/TextFormField";
import { useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { UserContext } from "../../utils/useAuth";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useHistory();
  const context = useContext(UserContext);

  return (
    <div className="login-page">
      <div className="login__form">
        <div className="login__form--header">
          <div className="icon">
            <TwitterIcon />
          </div>
          <h1>Tạo tài khoản của bạn</h1>
        </div>
        <div className="login__form--body">
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { registerInput: values },
              });
              if (response.data?.register.error) {
                setErrors(toErrorMap(response.data?.register.error));
              } else {
                context.login(response.data?.register.user);
                router.push("/home");
              }
            }}
          >
            {({isSubmitting}) => (
              <Form>
                <Field
                  label="Username"
                  name="username"
                  component={TextFormField}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  component={TextFormField}
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  component={TextFormField}
                />
                <Field
                  label="ConfirmPassword"
                  name="confirmPassword"
                  type="password"
                  component={TextFormField}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  className="sidebar__tweet"
                >
                  Đăng ký
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
