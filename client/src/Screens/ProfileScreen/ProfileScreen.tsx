import { useParams } from "react-router";
import TabelInfo from "../../components/TabelInfo/TabelInfo";
import "./ProfileScreen.scss";

const data = [
  {
    name: "patryk",
    email: "koko@Key",
  },
];
export default function ProfileScreen() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="profile-screen">
      <h1>Profile Screen</h1>
      <h2>{id}</h2>
      <TabelInfo data={data} />
    </div>
  );
}
