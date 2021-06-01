// __tests__/fetch.test.js
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Field, Form, Formik } from "formik";
import { Button } from "@material-ui/core";
import { Loading } from "./components/Loading";
import { TextFormField } from "./components/TextFormField";

afterEach(cleanup);

test("make sure login success", async () => {
  const mock = jest.fn();
  const { debug, getByTestId, getByText } = render(
    <Formik initialValues={{ username: "", password: "" }} onSubmit={mock}>
      {({ isSubmitting }) => (
        <Form>
          <Field label="Username" name="username" data-testid="usernameInput"/>
          <Field
            label="Password"
            name="password"
            type="password"
            data-testid="passwordInput"
          />
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            className="sidebar__tweet"
          >
            Đăng nhập
          </Button>
        </Form>
      )}
    </Formik>
  );

  const usernameInput = await waitFor(() => getByTestId('usernameInput'))
  const passwordInput = await waitFor(() => getByTestId('passwordInput'))
  const submitButton = await waitFor(() => getByText("Đăng nhập")) 

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: "longbi" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
  });

  await waitFor(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(mock).toBeCalled();
    expect(mock.mock.calls[0][0].username).toBe('longbi');
    expect(mock.mock.calls[0][0].password).toBe('123');
  });

});
