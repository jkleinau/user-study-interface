'use client';
import { useEffect, useState } from 'react';
import { Annotation, study } from '../interfaces/study';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { type ColDef, type GridOptions, type ValueGetterParams } from 'ag-grid-community';

export default function Dashboard() {
  const [rowData, setRowData] = useState<study[]>([]);
  const columnDefs: ColDef[] = [
    { valueGetter: 'node.rowIndex + 1', headerName: 'No.' },
    {
      field: 'id',
      cellDataType: 'string'
    },
    {
      field: 'createdAt',
      cellDataType: 'dateString',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'updatedAt',
      cellDataType: 'dateString',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'submittedAt',
      cellDataType: 'dateString',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      headerName: 'Selections',
      //@ts-expect-error - TS complains about the children property
      children: [
        {
          columnGrupShow: 'closed', field: 'Average', cellDataType: 'number', valueGetter: (p: { data: { ImageSelection: { [s: string]: { selection: number; }; } | ArrayLike<{ selection: number; }>; }; }) => {
          const selections: { selection: number }[] = Object.values(p.data.ImageSelection);
          return selections.reduce((sum, obj:{selection:number}) => sum + obj.selection, 0) / selections.length;
        },
        valueFormatter: (params: { value: number; }) => params.value.toFixed(2),
      },
      {
        field: 'ImageSelection.27300.selection',
        headerName: '27300',
        columnGroupShow: 'open',
      },
      {
        field: 'ImageSelection.27398.selection',
        headerName: '27398',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.27591.selection',
        headerName: '27591',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.27931.selection',
        headerName: '27931',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28113.selection',
        headerName: '28113',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28125.selection',
        headerName: '28125',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28285.selection',
        headerName: '28285',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28362.selection',
        headerName: '28362',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28383.selection',
        headerName: '28383',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28583.selection',
        headerName: '28583',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28782.selection',
        headerName: '28782',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.28892.selection',
        headerName: '28892',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.29058.selection',
        headerName: '29058',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.29188.selection',
        headerName: '29188',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.29408.selection',
        headerName: '29408',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.29527.selection',
        headerName: '29527',
        columnGroupShow: 'open',
      },{
        field: 'ImageSelection.29762.selection',
        headerName: '29762',
        columnGroupShow: 'open',
      },
      ]
    },
    {
      headerName: 'Annotations',
      //@ts-expect-error - TS complains about the children property
      children: [
        {
          columnGrupShow: 'closed', field: 'Amount of Polygons', cellDataType: 'number', 
          valueGetter: (p:ValueGetterParams) => {
            const polygons: Annotation[][] = Object.values(p.data.ImageAnnotations);
            return polygons.reduce((sum, obj:Annotation[]) => sum + obj.length, 0);
          },
        // valueFormatter: (params: { value: number; }) => params.value.toFixed(2),
      },
      ]
    }
  ];
  const gridOptions: GridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      sortable: true,
      filter: true
    },
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50, 100],
    suppressMenuHide: true,
    // domLayout: 'autoHeight',
    onGridReady: (params) => {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit();
        });
      });
    },
    autoSizeStrategy: {
      type: 'fitCellContents'
    }
  };
  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setRowData(data as study[]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='h-screen p-4'>
      <h1 className='text-3xl text-center mb-4'>Dashboard</h1>
      <div className='ag-theme-quartz w-full h-5/6'>
        <AgGridReact gridOptions={gridOptions} rowData={rowData} />
      </div>
    </div>
  );
}
