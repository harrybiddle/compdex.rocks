import React, { useEffect, useState } from "react";
import ScenarioExplorer from "../scenarioexplorer/ScenarioExplorer";
import axios from "axios";
import { Spinner, Card } from "react-bootstrap";
import styles from "../common.module.css";

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
      <div className={styles.centering}>
        <Spinner animation="border" />
      </div>
    );
  } else if (data.hasErrored) {
    return (
      <div className={styles.centering}>
        <Card bg="danger" text="white" style={{ width: "18rem" }}>
          <Card.Header>Something went wrong!</Card.Header>
          <Card.Body>
            <Card.Text>
              The competition data could not be fetched. Sorry.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return <ScenarioExplorer {...data.state} />;
  }
}
