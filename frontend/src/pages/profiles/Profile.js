import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
      <div className={`text-right`}>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlueOutline}`}
              onClick={() => {}}
            >
              Unsubscribe
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Grey}`}
              onClick={() => {}}
            >
              Subscribe
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
