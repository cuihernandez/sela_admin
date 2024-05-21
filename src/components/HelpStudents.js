import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {alpha, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import {visuallyHidden} from '@mui/utils';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import EditImage from '../assets/Edit_btn_icon.png';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
import {db} from '../firebase';
import {Link, useNavigate} from 'react-router-dom';
import {useEditContext} from '../EditContext';
import {AddOutlined, DeleteOutlineOutlined, PlusOne} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#560FC9',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'delete',
    numeric: true,
    disablePadding: false,
    label: '',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'מספר טלפון',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'שם מלא',
  },
  {
    id: 'photo',
    numeric: true,
    disablePadding: false,
    label: 'תמונה',
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
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {numSelected} = props;

  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{flex: '1 1 100%'}}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{flex: '1 1 100%'}}
          variant="h6"
          id="tableTitle"
          component="div">
          {/* Okay */}

          <Link to="new">
            <IconButton>
              <AddOutlined
                sx={{
                  width: 30,
                  fill: '#560FC9',
                }}
              />
            </IconButton>
          </Link>
        </Typography>
      )}

      <Paper
        component="form"
        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder="לחפש"
          inputProps={{'aria-label': 'search google maps'}}
        />
        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function HelpStudents() {
  const navigate = useNavigate();
  const {updateEditData} = useEditContext();

  const handleStudentDelete = async studentId => {
    // updateEditData(rowData);
    // navigate(`/donors/${rowData.id}`);
    console.log({studentId, db});

    try {
      // Reference to the document

      const docRef = doc(db, 'students', studentId); // Replace 'collectionName' with your collection name

      // Delete the document
      await deleteDoc(docRef);

      console.log('Document successfully deleted');
      getTableData();
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id);
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const [visibleRows, setVisibleRows] = useState([]);

  const getTableData = async () => {
    const studentsRef = collection(db, 'students');
    const snapshot = await getDocs(studentsRef);

    let groupedStudents = [];
    snapshot.forEach(doc => {
      const student = doc.data();

      console.log({student});
      const key = `${student.name}_${student.phone}_${student.photo}`;

      // Find the existing group in the array
      let group = groupedStudents.find(g => g.key === key);

      if (!group) {
        group = {
          id: doc.id,
          name: student.name,
          phone: student.phone,
          photo: student.photo,
          key: key, // Store the key for identification
        };
        groupedStudents.push(group);
      }

      group.totalDonation += student.studentAmount;
      group.credit++;
    });

    groupedStudents.forEach(group => {
      group.credit = group.totalDonation - group.credit * 0.2;
    });

    setRows(groupedStudents);
  };
  useEffect(() => {
    setVisibleRows(rows);
  }, [rows]);
  useEffect(() => {
    getTableData();
  }, []);
  useEffect(() => {
    console.log('Rows data is---', rows);
    const updatedVisibleRows = stableSort(
      rows,
      getComparator(order, orderBy),
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setVisibleRows(updatedVisibleRows);
  }, [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                console.log({row});

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{cursor: 'pointer'}}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="right">
                      <IconButton onClick={() => handleStudentDelete(row.id)}>
                        <DeleteOutlineOutlined
                          //   color="#560FC9"
                          sx={{fill: '#560FC9'}}
                        />
                      </IconButton>
                    </TableCell>
                    {/* <TableCell align="right">{row.credit}</TableCell>
                    <TableCell align="right">{row.totalDonation}</TableCell> */}
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          borderRadius: '100%',
                          width: '2.5rem',
                          height: '2.5rem',
                          overflow: 'clip',
                          backgroundColor: '#560FC9',
                          marginLeft: 'auto',
                        }}>
                        <img
                          src={row.photo}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </Box>
                      {/* {row.photo || row.name} */}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onChange={event => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
