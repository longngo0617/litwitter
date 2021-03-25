import React, { useContext } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Field, Formik, Form } from "formik";
import { Button,Link } from "@material-ui/core";
import { TextFormField } from "../../components/TextFormField";
import { useLoginMutation } from "../../generated/graphql";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../utils/useAuth";
import { toErrorMap } from "../../utils/toErrorMap";
import { Loading } from "../../components/Loading";

export const Login: React.FC<{}> = ({}) => {
  const [login] = useLoginMutation();
  const router = useHistory();
  const context = useContext(UserContext);

  if (context?.user?.id) return <Redirect to="/home" />;

  return (
    <div className="login-page">
      <div className="login__form">
        <div className="login__form--header">
          <div className="icon">
            <TwitterIcon />
          </div>
          <h1>Đăng nhập vào LiTwitter</h1>
        </div>
        <div className="login__form--body">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
              });
              if (response.data?.login.error) {
                setErrors(toErrorMap(response.data?.login.error))
              } else {
                context.login(response.data?.login.user)
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
                  label="Password"
                  name="password"
                  type="password"
                  component={TextFormField}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  className="sidebar__tweet"
                >
                  {isSubmitting ? <Loading /> : "Đăng nhập"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="login__form--footer">
          <div className="login__form--links">
            <Link href="/register" className="login__form--link">Đăng ký LiTwitter</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
