import { useParams } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import "./AuthorizationScreen.scss";

const SIGN_UP = "SignUp";
const LOGIN = "Login";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

const AuthorizationScreen = () => {
  const { type } = useParams<{ type: "signUp" | "login" }>();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="auth-screen" onSubmit={handleSubmit(onSubmit)}>
      <Modal title="Sign Up">
        <form action="" className="auth-screen__form">
          <Input styles={"input__auth-screen input"} placeholderTxt={"name"} />
          <Input styles={"input__auth-screen input"} placeholderTxt={"email"} />
          <Input
            styles={"input__auth-screen input"}
            placeholderTxt={"password"}
          />
        </form>

        <div className="auth-screen__buttons">
          <Button styles={"button button--accent"}>
            {type !== "signUp" ? SIGN_UP : LOGIN}
          </Button>
          <Button styles={"button button--secondary"}>
            {type === "signUp" ? SIGN_UP : LOGIN}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorizationScreen;
