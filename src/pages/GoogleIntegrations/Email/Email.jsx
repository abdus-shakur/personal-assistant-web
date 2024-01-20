import {
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { getEmailList, getEmailDetail, setToken } from "./service/EmailService";
import {
  ArrowBack,
  LoginOutlined,
  Logout,
  Refresh,
  RefreshOutlined,
  Settings,
} from "@mui/icons-material";

import oauthSignIn, { logoutGoogle, oauthSignInHandled } from "../oauth/manageLogin";

export default function Email() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmailMessageAuthenticated();
  }, []);

  function getEmailMessageAuthenticated(){
    oauthSignInHandled()
    .then(() => {
      getEmailMessage();
    })
    .catch((error) => {
      // logoutGoogle();
      alert("Error in Get Email MEssage Authenticated : "+error)
    });
  }

  function getEmailMessage() {
    setLoading(true);
    getEmailList()
      .then((response) => {
        setEmails(() => [...response.data]);
      }).catch((error)=>{
        console.log(error);
        alert("Error in Get Email MEssage  : "+error.response.data.error)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function EmailDetails(props) {
    const { email, onBack } = props;
    const [emailDetail, setEmailDetail] = useState();
    const [detailLoading, setDetailLoading] = useState(false);
    useEffect(() => {
      refreshEmailDetail();
    }, []);

    function refreshEmailDetail() {
      setDetailLoading(true);
      getEmailDetail(email.id)
        .then((resp) => {
          setEmailDetail(() => ({ ...resp.data }));
        })
        .finally(() => {
          setDetailLoading(false);
        });
    }

    function headers(name) {
      return emailDetail.payload.headers.find((header) => header.name === name);
    }

    return (
      <React.Fragment>
        <IconButton onClick={onBack}>
          <ArrowBack />
        </IconButton>

        <IconButton onClick={refreshEmailDetail}>
          <RefreshOutlined />
        </IconButton>
        <div>Email : {email.id}</div>
        {emailDetail ? (
          <React.Fragment>
            <Typography>From : {headers("From").value}</Typography>
            <Typography>To : {headers("To").value}</Typography>
            <Typography>Subject : {headers("Subject").value}</Typography>
            <Typography>Date : {headers("Date").value}</Typography>
            <Typography>Snippet : {emailDetail.snippet}</Typography>
            {emailDetail.payload.parts ? (
              emailDetail.payload.parts
                .filter((filter) => filter.mimeType !== "text/plain")
                .map((part) => (
                  <React.Fragment>
                    <Typography>Type : {part.mimeType}</Typography>
                    <div dangerouslySetInnerHTML={{ __html: part.body.data }} />
                    {/* <Typography>Data : {part.body}</Typography> */}
                  </React.Fragment>
                ))
            ) : (
              <React.Fragment>
                <Typography>Type : {emailDetail.payload.mimeType}</Typography>
                <div
                  style={{ maxWidth: "100vw" }}
                  dangerouslySetInnerHTML={{
                    __html: emailDetail.payload.body.data,
                  }}
                />
                {/* <Typography>Data : {part.body}</Typography> */}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <></>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.appBar - 1 }}
          open={detailLoading}
          onClick={() => setDetailLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }

  const [selectedEmail, setSelectedEmail] = useState(null);

  if (null != selectedEmail) {
    return (
      <EmailDetails
        email={selectedEmail}
        onBack={() => setSelectedEmail(null)}
      />
    );
  }

  return (
    <div className="relation-container">
      <CssBaseline />

      <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemButton onClick={getEmailMessageAuthenticated}>
            <ListItemIcon>
              <Refresh />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={setToken}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={oauthSignIn}>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={logoutGoogle}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {emails.map((email) => (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemButton
                style={{ padding: 0 }}
                onClick={() => {
                  setSelectedEmail(email);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={
                      email.payload.headers.filter(
                        (filter) => filter.name === "From"
                      )[0].value
                    }
                    src="/static/images/avatar/3.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    email.payload.headers.filter(
                      (filter) => filter.name === "Subject"
                    )[0].value
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {
                          email.payload.headers.filter(
                            (filter) => filter.name === "From"
                          )[0].value
                        }
                      </Typography>
                      {` — ${
                        email.payload.headers.filter(
                          (filter) => filter.name === "Subject"
                        )[0].value
                      }…`}
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.appBar - 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
