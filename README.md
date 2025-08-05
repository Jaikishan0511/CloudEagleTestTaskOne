## Approach
- Data Fetching from API/MockData
- Manage State using Component and context
- Add Virtual Scrolling for efficient rendering
- Add Inline Editing and Row actions
- Filtering and sorting the fields
- Pagination integration

## Limitations
- No backend Save Api integration
- limited Validation
- Performance issue in case of many edits

##  Features

- Column filtering (name, email, salary)
- Multi-column sorting
- Inline editing of rows
- Save,  Cancel,
- Paginated view (custom rows per page)
- High performance via virtual scroll (`react-virtualized`)
- CSV export of filtered results
// Data fetched from external API (MockFast)

---

## Technologies Used

- React
- Material UI (MUI v5)
- react-virtualized
- JavaScript (ES6)
- CORS proxy for API fetching (in development)

---

##  Installation

```bash

cd TestTask
npm install
npm start

