import React from "react"
import { DataTable } from "../RecentOrders/Data-table"
import {columns} from "./columns"

// Simulate fetching data
async function getData() {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // Add more sample data if needed
  ];
}

export default function RecentOrders() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <p>weufgdib</p>
      <DataTable columns={columns} data={data} />
    </div>
  );
}




// import React from 'react'

// const RecentOrders = () => {
//   return (
//     <div className='h-[50rem]'>
//       Recent Orders
//     </div>
//   )
// }

// export default RecentOrders
