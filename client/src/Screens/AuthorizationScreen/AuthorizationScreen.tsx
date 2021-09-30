import { useHistory, useParams } from "react-router";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import "./AuthorizationScreen.scss";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../assets/consts";
import { gql, useMutation } from "@apollo/client";
import { useNotificationBar } from "../../hooks/useNotificationBar";

const SIGN_UP = "SignUp";
const LOGIN = "Login";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String) {
    createUser(email: $email, name: $name, password: $password) {
      id
      message
      success
      token
    }
  }
`;
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String) {
    loginUser(email: $email, password: $password) {
      id
      message
      success
      token
    }
  }
`;

const AuthorizationScreen = () => {
  const { type } = useParams<{ type: "signup" | "login" }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const history = useHistory();
  const isSignUp = type === "signup";

  const { showNotification } = useNotificationBar();

  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (isSignUp) {
      try {
        showNotification("Creating User", "pending");
        const newUser = await createUser({
          variables: {
            email: data.email,
            name: data.name,
            password: data.password,
          },
        });

        if (!newUser.data.createUser.success) {
          throw new Error(newUser.data.createUser.message);
        }
        history.push(`/profile/${newUser.data.createUser.id}`);
        showNotification("User created", "done");
      } catch (error: any) {
        showNotification(error.message, "error");
      }
    } else {
      try {
        showNotification("Checking data...", "pending");
        const userInfo = await loginUser({
          variables: {
            email: data.email,
            password: data.password,
          },
        });
        if (userInfo.data.loginUser.token) {
          showNotification("Welcome!", "done");
          history.push(`/profile/${userInfo.data.loginUser.id}`);
        }
      } catch (error) {
        showNotification("Wrong password or email", "error");
      }
    }
  };

  const changePage = () => {
    reset();
    history.push(
      `${isSignUp ? "/authorization/login" : "/authorization/signup"}`
    );
  };

  return (
    <div className="auth-screen">
      <Modal title={isSignUp ? "Sign Up" : "Login"}>
        <form className="auth-screen__form" onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
            <input
              className={`input__auth-screen ${
                errors.name ? "input__auth-screen--error" : ""
              }`}
              placeholder={"name"}
              {...register("name", { required: true, minLength: 3 })}
            />
          )}
          <input
            className={`input__auth-screen ${
              errors.email ? "input__auth-screen--error" : ""
            }`}
            placeholder={"email"}
            {...register("email", {
              required: true,
              pattern: EMAIL_VALIDATION,
            })}
          />
          <input
            type="password"
            className={`input__auth-screen ${
              errors.password ? "input__auth-screen--error" : ""
            }`}
            placeholder={"password"}
            {...register("password", {
              required: true,
              pattern: isSignUp ? PASSWORD_VALIDATION : undefined,
            })}
          />
          {Object.keys(errors).length > 0 && (
            <div className="auth-screen__validation">
              <ul className="auth-screen__validation-list">
                {errors.name && <li>Name is required min 3 length</li>}
                {errors.email && (
                  <li>Email is required, provide valid email</li>
                )}
                {errors.password && (
                  <li>
                    {isSignUp
                      ? "Wrong password min length: 3 one letter, one number, one capital letter"
                      : "Password is required"}
                  </li>
                )}
              </ul>
            </div>
          )}
          <button className="button button--accent button--auth" type="submit">
            {isSignUp ? SIGN_UP : LOGIN}
          </button>
        </form>

        <div className="auth-screen__buttons">
          <Button styles={"button button--secondary"} callback={changePage}>
            {!isSignUp ? SIGN_UP : LOGIN}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorizationScreen;
