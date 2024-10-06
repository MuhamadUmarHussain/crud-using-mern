import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal  from './Modal';
import UpdateTable from './UpdateTable';
import DeleteTable from './DeleteTable';
import axios from 'axios';

function Table(props) {

    const [btn, setbtn] = React.useState(false);

    function btnAppear(){
        if(btn === true){
            setbtn(false)
        }else{
            setbtn(true);
        }
    }

    const [updateBtn, setUpdateBtn] = React.useState(false);

    function updateBtnAppear(id){
        if(updateBtn === true){
            setUpdateBtn(false)
        }else{
            setUpdateBtn(true);
            props.updateClick(id);
        }
    }

    const [deleteBtn, setDeleteBtn] = React.useState(false);

    function deleteBtnAppear(id){
        if(deleteBtn === true){
            setDeleteBtn(false)
        }else{
            setDeleteBtn(true);
            props.updateClick(id);
        }
    }

    const [data,setdata] = React.useState([]);

    React.useEffect(()=>{

      async function featchData() {

        try{

          const featchUser = await axios.get("http://localhost:4000/api/get");
          const responce = featchUser.data;
          setdata(responce);

        }catch(err){
          console.log(err);
        }
        
      }

      featchData();

    }, [data]);

  return (
    <div>


        <div>
            {btn ? <Modal onclick={btnAppear} /> : null}
        </div>

        <div>
            {updateBtn && <UpdateTable onclick={updateBtnAppear}  id={props.rowId} /> }
        </div>

        <div>
            {deleteBtn && <DeleteTable onclick={deleteBtnAppear} id={props.rowId}/>}
        </div>

      <div class="max-w-4xl mx-auto mt-10">
        <div class="bg-gradient-to-r from-teal-400 to-gray-500 p-6 rounded-t-lg flex justify-between items-center">
          <h2 class="text-white text-xl font-bold">
            Manage <span class="font-normal">Employees</span>
          </h2>
          <button onClick={btnAppear} class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <AddIcon />
            Add New Employee
          </button>
        </div>

        <div class="bg-white shadow-md rounded-b-lg overflow-hidden">
          <table class="min-w-full text-center">
            <thead>
              <tr class="bg-gray-50 border-b">
                <th class="py-3 px-6 text-gray-700">Name</th>
                <th class="py-3 px-6 text-gray-700">Father</th>
                <th class="py-3 px-6 text-gray-700">Email</th>
                <th class="py-3 px-6 text-gray-700">Phone</th>
                <th class="py-3 px-6 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
                {data.users?.map((ele,index) => {

                    return (

                      <tr>
                        <td>{ele.name}</td>
                        <td>{ele.father_name}</td>
                        <td>{ele.email}</td>
                        <td>{ele.phone}</td>
                        <td><span title='update' className='cursor-pointer text-yellow-500' onClick={()=>{
                          updateBtnAppear(ele._id);
                        }}><UpdateIcon /></span> <span  title='delete' className='cursor-pointer text-red-500' onClick={()=>{
                          deleteBtnAppear(ele._id)
                        }} ><DeleteIcon /></span></td>
                      </tr>
                    
                    )

                })}
                    
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
