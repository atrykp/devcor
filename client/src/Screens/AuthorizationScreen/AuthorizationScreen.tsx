import { useParams } from "react-router";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./AuthorizationScreen.scss";

const SIGN_UP = "SignUp";
const LOGIN = "Login";

const AuthorizationScreen = () => {
  const { type } = useParams<{ type: "signUp" | "login" }>();

  return (
    <div className="auth-screen">
      <Modal>
        <div className="auth-screen__form">
          <form action="">
            <input type="text" />
          </form>
        </div>

        <div className="auth-screen__buttons">
          <Button>{type === "signUp" ? SIGN_UP : LOGIN}</Button>
          <Button styles={"button button--secondary"}>
            {type !== "signUp" ? SIGN_UP : LOGIN}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorizationScreen;
