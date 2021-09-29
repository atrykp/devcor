import { useHistory, useParams } from "react-router";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import "./AuthorizationScreen.scss";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../assets/consts";
import { gql, useMutation } from "@apollo/client";

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

const AuthorizationScreen = () => {
  const { type } = useParams<{ type: "signup" | "login" }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newUser = await createUser({
      variables: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
  };
  const isSignUp = type === "signup";

  const history = useHistory();

  const changePage = () => {
    reset();
    history.push(
      `${isSignUp ? "/authorization/login" : "/authorization/signup"}`
    );
  };
  console.log(errors);

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
              pattern: PASSWORD_VALIDATION,
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
                    Wrong password min length: 3 one letter, one number, one
                    capital letter
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
