import axios from "axios";
import { useEffect, useState } from "react";
import Logo from "../logo/Logo";
import Group from "./Group";
import "./styles/index.css";
import User from "./User";
import LogoutIcon from "../../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import CreateGroupModal from "./modals/CreateGroupModal";
import SkeletonBody from "./skeleton/SkeletonBody.jsx";
import SkeletonFooter from "./skeleton/SkeletonFooter";

export default function Sidebar({ setWorkspaceId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = () => {
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setUser({
          name: res.data.data.name,
          email: res.data.data.email,
        });
        setGroups(res.data.data.groups);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    fetchUserData();
  }, []);

  const handleLogout = () => {
    axios.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Logo />
      </div>

      {isLoading ? (
        <>
          <div className="sidebar__body">
            <SkeletonBody />
          </div>
          <div>
            <SkeletonFooter />
          </div>
        </>
      ) : (
        <>
          <div className="sidebar__body">
            <h2 className="sidebar__body-title">Your groups</h2>
            {groups.length < 1 ? (
              <>
                <p className="sidebar__body-no-groups">You have no groups =/</p>
              </>
            ) : (
              <div className="sidebar__groups">
                {groups.map((group) => (
                  <Group
                    data={group}
                    key={group.id}
                    fetchUserData={fetchUserData}
                    setWorkspaceId={setWorkspaceId}
                  />
                ))}
              </div>
            )}

            <div className="button-wrapper">
              <Button
                className="sidebar__create-one"
                title="New group"
                onClick={() => setShowCreateGroupModal(!showCreateGroupModal)}
              />
            </div>

            <CreateGroupModal
              open={showCreateGroupModal}
              setOpen={setShowCreateGroupModal}
              fetchUserData={fetchUserData}
            />
          </div>

          <div className="sidebar__footer">
            <User data={user} />
            {/* <span className="sidebar__footer-divider"></span> */}
            <img
              className="sidebar__logout"
              src={LogoutIcon}
              alt="Log out"
              onClick={() => handleLogout()}
            />
          </div>
        </>
      )}
    </div>
  );
}
