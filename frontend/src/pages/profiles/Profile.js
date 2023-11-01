import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser?.username === owner;

  return (
    <div className={`my-3 d-flex align-items-center`}>
      <div>
        <Link className="aling-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
    </div>
  );
};

export default Profile;
