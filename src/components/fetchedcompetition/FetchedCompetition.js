import React, { useEffect, useState } from "react";
import Competition from "../competition/Competition";
import axios from "axios";
const USER_SERVICE_URL = process.env.PUBLIC_URL + "/state.json";

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
    return <div>Fetching...</div>;
  } else if (data.hasErrored) {
    return <div>Errored :(</div>;
  } else {
    console.log(JSON.stringify(data));
    return <Competition {...data.state} />;
  }
}
