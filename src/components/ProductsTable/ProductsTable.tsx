import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IProdColumn } from '../../interfaces/IProdColumns';
import { IProduct } from '../../interfaces/IProducts';
import './ProductsTable.css';
import { ProductsTableRow } from './ProductsTableRow';

const columns: IProdColumn[] = [
  { id: 'id', label: 'ID', align: 'right' },
  { id: 'name', label: 'Name', align: 'right' },
  { id: 'year', label: 'Year', align: 'right' },
];

export function ProductsTable(props: any) {
  const rowClickHandler = (product: IProduct) => {
    props.onProductClick(product);
  };

  return (
    <Paper sx={{ width: '90vw' }}>
      <TableContainer sx={{ maxHeight: 440, backgroundColor: 'gray' }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.products &&
              props.products.map((row: IProduct) => {
                return (
                  <ProductsTableRow
                    key={row.id}
                    rowClick={() => rowClickHandler(row)}
                    columns={columns}
                    row={row}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
