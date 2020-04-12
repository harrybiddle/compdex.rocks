import React, { useEffect, useState } from "react";
import axios from "axios";
const USER_SERVICE_URL = process.env.PUBLIC_URL + "/state.json";

function App() {
  const [data, setData] = useState({
    state: [],
    isFetching: false,
    hasErrored: false
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ state: [], isFetching: true, hasErrored: false });
        const response = await axios.get(USER_SERVICE_URL);
        setData({ state: response.data, isFetching: false, hasErrored: false });
      } catch (e) {
        console.log(e);
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
    return <div>{data.state.toString()}</div>;
  }
}
export default App;
