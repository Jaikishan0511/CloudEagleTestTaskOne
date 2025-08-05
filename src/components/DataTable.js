import React, { useMemo, useCallback } from "react";
import { Table, Column, AutoSizer } from "react-virtualized";
import {
  Paper,
  IconButton,
  TextField,
  TableSortLabel,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
// import UndoIcon from "@mui/icons-material/Undo";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { useTableContext } from "../context/TableContext";
import { exportToCSV } from "../utils/csvExporter";
import "./DataTable.css";

const DataTable = () => {
  const {
    state: { data, editedRows, sortBy, sortDirection, filters, page, pageSize },
    dispatch,
  } = useTableContext();

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) =>
        value
          ? row[key].toString().toLowerCase().includes(value.toLowerCase())
          : true
      );
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortBy, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = page * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const handleEdit = (id, field, value) => {
    const original = data.find((row) => row.id === id);
    const current = editedRows[id] || original;
    dispatch({
      type: "EDIT_ROW",
      payload: {
        id,
        row: { ...current, [field]: value },
      },
    });
  };

  const renderCell = ({ cellData, rowData, dataKey }) => {
    const isEdited = editedRows[rowData.id];
    const displayValue = isEdited ? isEdited[dataKey] : rowData[dataKey];

    return (
      <TextField
        variant="standard"
        value={displayValue}
        onChange={(e) => handleEdit(rowData.id, dataKey, e.target.value)}
        fullWidth
      />
    );
  };

  const renderActionCell = ({ rowData }) => {
    const isEdited = editedRows[rowData.id];
    return (
      <Box display="flex" gap={1}>
        {
          <>
            <IconButton
              color="primary"
              onClick={() =>
                dispatch({
                  type: "SAVE_ROW",
                  payload: { id: rowData.id, row: isEdited },
                })
              }
              disabled={!isEdited}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() =>
                dispatch({
                  type: "CANCEL_EDIT",
                  payload: rowData.id,
                })
              }
              disabled={!isEdited}
            >
              <CancelIcon />
            </IconButton>
            {/* <IconButton
              onClick={() =>
                dispatch({
                  type: "UNDO_ROW",
                  payload: rowData.id,
                })
              }
              disabled={!isEdited}
            >
              <UndoIcon />
            </IconButton> */}
          </>
        }
      </Box>
    );
  };

  const headerRenderer = ({ dataKey, label }) => (
    <TableSortLabel
      active={sortBy === dataKey}
      direction={sortDirection}
      onClick={() =>
        dispatch({
          type: "SET_SORT",
          payload: { column: dataKey },
        })
      }
    >
      {label}
    </TableSortLabel>
  );

  return (
    <Box p={2}>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Filter by Name"
          value={filters.first_name || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTERS",
              payload: { ...filters, name: e.target.value },
            })
          }
        />
        <TextField
          label="Filter by Email"
          value={filters.email || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTERS",
              payload: { ...filters, email: e.target.value },
            })
          }
        />
        <TextField
          label="Filter by Salary"
          value={filters.salary || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTERS",
              payload: { ...filters, salary: e.target.value },
            })
          }
        />
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={() => exportToCSV(filteredData)}
        >
          Export CSV
        </Button>
      </Box>

      <Paper style={{ height: 500 }}>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={40}
              rowHeight={60}
              rowCount={paginatedData.length}
              rowGetter={({ index }) => paginatedData[index]}
              rowClassName="tableRow"
            >
              <Column
                label="Name"
                dataKey="first_name"
                width={250}
                cellRenderer={renderCell}
                headerRenderer={headerRenderer}
              />
              <Column
                label="Email"
                dataKey="email"
                width={300}
                cellRenderer={renderCell}
                headerRenderer={headerRenderer}
              />
              <Column
                label="Salary"
                dataKey="salary"
                width={150}
                cellRenderer={renderCell}
                headerRenderer={headerRenderer}
              />
              <Column
                label="Actions"
                dataKey="actions"
                width={200}
                cellRenderer={renderActionCell}
                headerRenderer={() => <strong>Actions</strong>}
              />
            </Table>
          )}
        </AutoSizer>
      </Paper>

      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormControl>
          <InputLabel>Rows per page</InputLabel>
          <Select
            value={pageSize}
            onChange={(e) =>
              dispatch({
                type: "SET_PAGE_SIZE",
                payload: Number(e.target.value),
              })
            }
            size="small"
            label="Rows per page"
          >
            {[10, 25, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, newPage) => {
            dispatch({ type: "SET_PAGE", payload: newPage - 1 });
          }}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default DataTable;

