import { useParams } from "react-router";
import TabelInfo from "../../components/TabelInfo/TabelInfo";
import "./ProfileScreen.scss";

const data = {
  name: "patryk",
  email: "koko@Key",
  hello: "world",
  id: "123",
};

export default function ProfileScreen() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="profile-screen">
      <h1 className="screen-header">Profile Screen</h1>
      <TabelInfo data={data} />
    </div>
  );
}
