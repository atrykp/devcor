import { useParams } from "react-router";
import "./ProfileScreen.scss";

export default function ProfileScreen() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="profile-screen">
      <h1>Profile Screen</h1>
      <h2>{id}</h2>
    </div>
  );
}
