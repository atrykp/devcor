import { useHistory, useParams } from "react-router";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import "./AuthorizationScreen.scss";

const SIGN_UP = "SignUp";
const LOGIN = "Login";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const AuthorizationScreen = () => {
  const { type } = useParams<{ type: "signup" | "login" }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const isSignUp = type === "signup";

  const history = useHistory();

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
              className={"input__auth-screen"}
              placeholder={"name"}
              {...register("name", { required: true })}
            />
          )}
          <input
            className={"input__auth-screen"}
            placeholder={"email"}
            {...register("email", { required: true })}
          />
          <input
            className={"input__auth-screen"}
            placeholder={"password"}
            {...register("password", { required: true })}
          />
          <button className="button button--accent" type="submit">
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
