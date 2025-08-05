import React, { createContext, useContext } from "react";

export const TableContext = createContext();

export const useTableContext = () => useContext(TableContext);

export const initialState = {
  data: [],
  editedRows: {},
  sortBy: null,
  sortDirection: "asc",
  filters: {},
  page: 0,
  pageSize: 25,
};

export const tableReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };

    case "EDIT_ROW":
      return {
        ...state,
        editedRows: {
          ...state.editedRows,
          [action.payload.id]: action.payload.row,
        },
      };

    case "SAVE_ROW": {
      const updatedData = state.data.map((row) =>
        row.id === action.payload.id ? action.payload.row : row
      );
      const { [action.payload.id]: _, ...rest } = state.editedRows;
      return {
        ...state,
        data: updatedData,
        editedRows: rest,
      };
    }

    case "CANCEL_EDIT": {
      const { [action.payload]: _, ...rest } = state.editedRows;
      return {
        ...state,
        editedRows: rest,
      };
    }

    case "UNDO_ROW":
      return {
        ...state,
        editedRows: {
          ...state.editedRows,
          [action.payload]: state.data.find((r) => r.id === action.payload),
        },
      };

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.column,
        sortDirection:
          state.sortBy === action.payload.column &&
          state.sortDirection === "asc"
            ? "desc"
            : "asc",
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
        page: 0,
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "SET_PAGE_SIZE":
      return {
        ...state,
        pageSize: action.payload,
      };

    default:
      return state;
  }
};
