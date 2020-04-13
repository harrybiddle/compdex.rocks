import React, { useEffect, useState } from "react";
import Competition from "../competition/Competition";
import axios from "axios";
import { Spinner, Card } from "react-bootstrap";

const DEFAULT_STATE_FILENAME = "state";
const VALID_FILENAME_REGEX = /^\w+\.json$/;

export function getStateFilenameFromUrl(location) {
  /*
   * Extracts "foo.json" from "https://compdex.rocks/comp?q=foo". Any additional query parameters are ignored.
   *  If the filename is missing or invalid, a default of "state.json" will be returned
   */
  const searchParams = new URLSearchParams(location.search);
  const stateFilename = (searchParams.get("q") || "state") + ".json";
  if (VALID_FILENAME_REGEX.test(stateFilename)) {
    return stateFilename;
  } else {
    // TODO error
    return DEFAULT_STATE_FILENAME + ".json";
  }
}

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
        const url =
          process.env.PUBLIC_URL +
          "/" +
          getStateFilenameFromUrl(window.location);
        const response = await axios.get(url);
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
