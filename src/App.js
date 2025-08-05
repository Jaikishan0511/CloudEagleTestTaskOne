import React, { useEffect, useReducer } from "react";
import DataTable from "./components/DataTable";
import {
  TableContext,
  tableReducer,
  initialState,
} from "./context/TableContext";
import axios from "axios";
import { CircularProgress, Box, Typography } from "@mui/material";
const PROXY_URL = "https://api.allorigins.win/raw?url=";
const API_URL = "https://mockfast.io/backend/apitemplate/get/0SUX1W07DV";
const ENCODED_API = encodeURIComponent(API_URL);
import generateMockData from "./utils/generatorMockData";
import mockData from "./constants/mockData.json";
const App = () => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const responseData = await axios.get(`${PROXY_URL}${ENCODED_API}`);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data");
        // }
        // console.log(responseData, "data");
        // const data = responseData;
        dispatch({ type: "SET_DATA", payload: mockData });
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          Editable Data Table
        </Typography>
        {state.data.length > 0 ? (
          <DataTable />
        ) : (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </TableContext.Provider>
  );
};

export default App;
