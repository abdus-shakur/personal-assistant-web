import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";
import { useEffect } from "react";
import { GetBasicVcards, GetVcardById } from "../../service/RelationManager/CategorizedContacts/getData";
import { Call, CallOutlined, CallSharp, CallToAction, ContactPageOutlined, MoreVert, SendOutlined } from "@mui/icons-material";
import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Popover } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Contact Name",
  },
  {
    id: "number",
    numeric: true,
    disablePadding: true,
    label: "Phone Number",
  },
  {
    id: "birthday",
    numeric: true,
    disablePadding: true,
    label: "Birthday",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected ,handlePopClick} = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Contacts
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {numSelected === 1 ?
        <Tooltip title="More">
          <IconButton onClick={handlePopClick}>
            <MoreVert />
          </IconButton>
        </Tooltip>:<div></div>}
        </React.Fragment>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ContactsSearchTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [contacts, setContacts] = useState([{
    "id": 3,
    "name": "A Cheenu",
    "number":"123456",
    "birthday":new Date().toLocaleString('en-us')
}]);
  const dummyDateValue = "Z";
  useEffect(() => {
    GetBasicVcards()
      .then((response) => {
        console.log(response.data);
        var data = response.data;
        var contHolder = [];
        response.data.forEach((dat) => {
          var cont = {};
          cont.id = dat.id;
          cont.name = dat.fullName;
          if (dat.phoneNumbers.length > 0)
            cont.number = dat.phoneNumbers[0].number;
          if(dat.birthDay){
            let birthday = new Date(dat.birthDay.substring(0,10));
            let tempBdayString = `${birthday.getUTCMonth()}/${birthday.getDate()}/${new Date().getFullYear()}`;
            birthday = new Date(`${birthday.getFullYear()}-${birthday.getUTCMonth()+1}-${birthday.getDate()}`);
            cont.birthday = birthday.toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'});
            let today = new Date();
            let bday = new Date(tempBdayString);
            cont.birthdayRemaining = Math.abs(bday-today)/(1000*60*60*24);
          }else{
            cont.birthday = dummyDateValue;
          }

          
          contHolder.push(cont);
        });
        setContacts(()=>contHolder.map(con=>{return con;}));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = contacts.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - contacts.length)
      : 0;

  const visibleContacts = React.useMemo(
    () =>
      stableSort(contacts, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [contacts,order, orderBy, page, rowsPerPage]
  );
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  const getContactDetails = (id)=>{
    GetVcardById(id).then(response=>console.log(JSON.stringify(response.data)));
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} handlePopClick={handlePopClick}/>
        <TableContainer  sx={{ maxHeight: "70vh" }}>
          <Table 
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={contacts.length}
            />
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            >
            <ListItem disablePadding>
                <ListItemButton href={`tel:${contacts.filter(con=>selected==con.id).map(con=>con.number)}`}>
                        <ListItemIcon>
                        <CallOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={`Call : ${contacts.filter(con=>selected==con.id).map(con=>con.name)}`} />
                    </ListItemButton></ListItem>
            <ListItem disablePadding>
                <ListItemButton href={`https://wa.me/${contacts.filter(con=>selected==con.id).map(con=>con.number.replace('+','').replace(' ',''))}`}>
                        <ListItemIcon>
                        <SendOutlined/>
                        </ListItemIcon>
                        <ListItemText primary="Whatsapp Chat" />
                    </ListItemButton></ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={()=>getContactDetails(contacts.filter(con=>selected==con.id).map(con=>con.id))}>
                        <ListItemIcon>
                        <ContactPageOutlined />
                        </ListItemIcon>
                        <ListItemText primary="View Contact Details" />
                    </ListItemButton></ListItem>
            </Popover>
            <TableBody>
              {visibleContacts.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <Tooltip title={row.birthdayRemaining}>
                    <TableCell align="center" >{row.birthday===dummyDateValue?null:row.birthday}</TableCell>
                    </Tooltip>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
