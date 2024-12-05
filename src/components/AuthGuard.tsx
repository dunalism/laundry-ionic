import { Route, Redirect, RouteProps } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

interface AuthGuardProps extends RouteProps {
  component: React.ComponentType<any>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default AuthGuard;
