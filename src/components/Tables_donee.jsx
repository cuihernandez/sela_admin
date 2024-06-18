import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from 'firebase/firestore/lite';
import {db} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {useEditContext} from '../EditContext';
import {DeleteOutline, EditCalendar, RotateLeft} from '@mui/icons-material';

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
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: '',
  },

  {
    id: 'delete',
    numeric: true,
    disablePadding: false,
    label: '',
  },

  {
    id: 'credit',
    numeric: true,
    disablePadding: false,
    label: 'יתרת קרדיט',
  },
  {
    id: 'totalDonation',
    numeric: true,
    disablePadding: false,
    label: 'תרומות',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'אימייל',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'שם מלא',
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
  const {numSelected, deleteSelected} = props;

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
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <Typography
            sx={{flex: '1 1 100%'}}
            color="inherit"
            variant="subtitle1"
            component="div">
            {numSelected} selected
          </Typography>
          <IconButton
            onClick={() => {
              const result = prompt(
                `Delete ${numSelected} transaction documents? enter "YES" to confirm`,
              );

              if (result.toLowerCase() === 'yes') {
                deleteSelected();
              }
            }}>
            <DeleteOutline />
          </IconButton>
        </div>
      ) : (
        <Typography
          sx={{flex: '1 1 100%'}}
          variant="h6"
          id="tableTitle"
          component="div"></Typography>
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

export default function EnhancedTable() {
  const navigate = useNavigate();
  const {updateEditData} = useEditContext();
  const handleDonorClick = rowData => {
    updateEditData(rowData);
    navigate(`/donors/${rowData.id}`);
  };
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);
      const transactionsRef = collection(db, 'transaction');
      const userDataCollectionRef = collection(db, 'userData');
      const snapshot = await getDocs(transactionsRef);

      let groupedTransactions = [];
      await Promise.all(
        snapshot.docs.map(async doc => {
          const transaction = doc.data();
          const key = `${transaction.doneeName}_${transaction.doneeEmail}_${transaction.donorID}`;

          // Find the existing group in the array
          let group;
          let totalCount = 0;

          const querySnapshot = await getDocs(userDataCollectionRef);
          querySnapshot.forEach(document => {
            const userDocData = document.data();
            if (
              userDocData.patientsPrayedFor &&
              Array.isArray(userDocData.patientsPrayedFor)
            ) {
              const itemCount = userDocData.patientsPrayedFor.filter(
                id => id === doc.id,
              ).length;
              totalCount += itemCount;
            }
          });

          if (!group) {
            group = {
              docId: doc.id,
              id: groupedTransactions.length,
              name: transaction.doneeName,
              email: transaction.doneeEmail,
              donorID: transaction.donorID,
              totalDonation: 0,
              credit: 0,
              totalPrayers: totalCount,
              key: key, // Store the key for identification
            };

            groupedTransactions.push(group);
          }

          group.totalDonation += transaction.transactionAmount;

          group.credit = group.totalDonation - group.totalPrayers * 0.2;
        }),
      );

      setRows(groupedTransactions);
    } catch (error) {
      console.error('GET_DONEE_DATA: ', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOne = async itemId => {
    try {
      await deleteDoc(doc(db, 'transaction', itemId));
      setRows(prev => prev.filter(row => row.docId !== itemId));
      alert('Document deleted successfully');
    } catch (error) {
      console.error({error});
    }
  };

  const deleteSelected = async () => {
    try {
      const batch = writeBatch(db);

      const docsToDelete = selected.map(selection => rows[selection].docId);

      docsToDelete.forEach(docId => {
        const docRef = doc(db, 'transaction', docId);
        batch.delete(docRef);
      });

      await batch.commit();
      alert('Documents deleted successfully');
      setRows(prev => prev.filter(row => !docsToDelete.includes(row.docId)));
    } catch (error) {
      alert('something went wrong');
    }
  };

  useEffect(() => {
    setVisibleRows(rows);
  }, [rows]);

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    const updatedVisibleRows = stableSort(
      rows,
      getComparator(order, orderBy),
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setVisibleRows(updatedVisibleRows);
  }, [rows, order, orderBy, page, rowsPerPage]);

  useEffect(() => {}, [visibleRows]);

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteSelected={deleteSelected}
        />
        <TableContainer>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                padding: '0 4rem',
                height: '4rem',
                width: '100%',
              }}>
              <RotateLeft className="spinner" sx={{fill: '#560FC9'}} />
            </Box>
          ) : (
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
                <>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

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
                          <IconButton
                            onClick={() => {
                              const result = prompt(
                                `Delete ${row.name} transaction document? enter "YES" to confirm`,
                              );

                              if (result.toLowerCase() === 'yes') {
                                deleteOne(row?.docId);
                              }
                            }}>
                            <DeleteOutline style={{fill: '#560FC9'}} />
                          </IconButton>
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="right">
                          <IconButton onClick={() => handleDonorClick(row)}>
                            <EditCalendar style={{fill: '#560FC9'}} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          {row.credit >= 0.2 ? row.credit : 0}
                        </TableCell>
                        <TableCell align="right">{row.totalDonation}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
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
                </>
              </TableBody>
            </Table>
          )}
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
