import { TableCell, TableRow } from '@mui/material';
import { IProduct } from '../../interfaces/IProducts';
import { IProdColumn } from '../../interfaces/IProdColumns';

export function ProductsTableRow(props: any) {
  return (
    <TableRow
      onClick={() => {
        props.rowClick(props.row);
      }}
      hover
      role="checkbox"
      tabIndex={-1}
      style={{ backgroundColor: props.row.color }}
      className="tableRow"
    >
      {props.columns.map((column: IProdColumn) => {
        const value = props.row[column.id as keyof IProduct];
        return (
          <TableCell key={column.id} align={column.align}>
            <p>{value}</p>
          </TableCell>
        );
      })}
    </TableRow>
  );
}
