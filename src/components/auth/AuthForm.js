import { useEffect, useState } from "react";
import * as api from "../../apis/apis";
import classes from "./Auth.module.css";

const AuthForm = ({ onChangeUser, user }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const changeUserHandler = (e) => {
    onChangeUser(e.target.value);
  };

  const getUsers = () => {
    setIsLoading(true);
    api
      .fetchUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error} </p>;

  return (
    <div className={classes["user-container"]}>
      <label> Login as </label>
      <select value={user} onChange={changeUserHandler}>
        {users.map(({ username }) => {
          return (
            <option className="dropdown-item" key={username}>
              {username}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AuthForm;
