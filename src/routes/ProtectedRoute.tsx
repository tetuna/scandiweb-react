import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"
import { userCan } from "utils/helpers/Utils";
import { errorAlert } from "components/shared-components/alerts/BasicAlert"

const canAccess = (useRoles, accessRoles) => {

  if (!accessRoles) return true;
  return useRoles.some(r => accessRoles.includes(r));
}

export default function ProtectedRoute({ Component, accessRoles, permission = null, ...props }) {
  const user = useSelector(state => state.user);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.getUserInfo().then(res => {
      dispatch({ type: 'PUT_USER', user: res.user });
    }).catch(err => {
      dispatch({ type: 'PUT_USER', user: null });
    }).finally(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  if (user && user.email) {
    return (canAccess(user?.roles, accessRoles)) /*&& userCan(user?.permissions, permission))*/
      ? <Component {...props} /> : <Navigate to="/forbidden" />
  } else {
    return (
      <Navigate to="/login" />
    )
  }
}
