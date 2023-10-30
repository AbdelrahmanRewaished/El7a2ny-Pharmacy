import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { patientRegistrationRoute } from "../../data/routes/guestRoutes";
import patientImage from "../../assets/patient.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import UserRole from "../../types/enums/UserRole";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/material";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import { adminDashboardRoute } from "../../data/routes/adminRoutes";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />
));

// TODO: Handle this commented useEffect

// TODO: Handle edge case in routes where if I'm already logged in
// and I try to enter the URL of the login page, I should be redirected to the
// dashboard page of the user role I'm logged in as.
export default function PatientLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { authState, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (authState.isAuthenticated) {
  //     if (authState.role === UserRole.PATIENT) {
  //       navigate(patientDashboardRoute.path);
  //     } else if (authState.role === UserRole.ADMIN) {
  //       navigate(adminDashboardRoute.path);
  //     }
  //   }
  // }, [
  //   authState.accessToken,
  //   authState.isAuthenticated,
  //   authState.role,
  //   navigate,
  // ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset error state
    setUsernameError(false);
    setPasswordError(false);
    setShowAlert(false);

    // Basic form validation
    if (username === "") {
      setUsernameError(true);
      return;
    }

    if (password === "") {
      setPasswordError(true);
      return;
    }

    if (username === "patient" && password === "123") {
      login("TEMP-PATIENT-ACCESS-TOKEN", UserRole.PATIENT);
      navigate(patientDashboardRoute.path);
    } else if (username === "admin" && password === "123") {
      login("TEMP-ADMIN-ACCESS-TOKEN", UserRole.ADMIN);
      navigate(adminDashboardRoute.path);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid container columnSpacing={7}>
        <Grid item xs={12} md={6}>
          <img
            src={patientImage}
            alt="Patient"
            style={{
              width: "100%",
              marginTop: "3.5rem",
              boxShadow:
                "0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/")}
              sx={{ mb: 5, fontSize: "1.2rem" }}
            >
              Back to Home
            </Button>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {showAlert && (
              <Alert
                variant="outlined"
                severity="error"
                sx={{ mt: 4, mb: 2 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Oops!</AlertTitle>
                Something's wrong with your credentials —{" "}
                <strong>please make sure they're correct!</strong>
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Patient Username"
                name="username"
                placeholder="Enter your patient account's username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError ? "Username is required" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Enter your password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* TODO: Add Forgot password href here */}
                  <NavLink to="/" style={{ color: "inherit" }}>
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to={patientRegistrationRoute.path}
                    style={{ color: "inherit" }}
                  >
                    Don't have an account? Sign Up
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
