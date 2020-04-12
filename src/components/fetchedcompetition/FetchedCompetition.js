import React, { useEffect, useState } from "react";
import Competition from "../competition/Competition";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

const USER_SERVICE_URL = process.env.PUBLIC_URL + "/state.json";

const CENTERING_CSS_STYLE = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
};
export default function FetchedCompetition() {
  const [data, setData] = useState({
    state: [],
    isFetching: true,
    hasErrored: false
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ state: [], isFetching: true, hasErrored: false });
        const response = await axios.get(USER_SERVICE_URL);
        setData({ state: response.data, isFetching: false, hasErrored: false });
      } catch (e) {
        console.error(e);
        setData({ state: [], isFetching: false, hasErrored: true });
      }
    };
    fetchUsers();
  }, []);

  if (data.isFetching) {
    return (
      <div style={CENTERING_CSS_STYLE}>
        <Spinner animation="border" />
      </div>
    );
  } else if (data.hasErrored) {
    return (
      <div style={CENTERING_CSS_STYLE}>
        <Card bg="danger" text="white" style={{ width: "18rem" }}>
          <Card.Header>Something went wrong!</Card.Header>
          <Card.Body>
            <Card.Text>
              The app could not be loaded, and we have no idea why. Sorry.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <Competition {...data.state} />;
  }
}
