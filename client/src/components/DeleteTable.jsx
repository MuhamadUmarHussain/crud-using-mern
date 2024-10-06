import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import toast from 'react-hot-toast';


function DeleteTable(props) {

    const deleteref = React.useRef();

    function deleteData(e){

        if(deleteref.current === e.target){
            props.onclick();
        }

    }

    async function handleDelete(e){
        e.preventDefault();
        const id = props.id;
        try{

            const deleteUser = await axios.delete(`http://localhost:4000/api/delete/${id}`);
            const responce = deleteUser.data;

            if(responce.sucess){
                toast.success(responce.Message);
            }
            console.log(responce);

        }catch(error){
            console.log(error);
        }
        props.onclick();
        
    }

  return (
    <div>
      <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm'>

        <main ref={deleteref} onClick={deleteData} className='h-screen flex flex-col justify-center items-center'>

            <section className='h-[250px] w-[450px] bg-slate-50'>
                <div className="closeIcon flex justify-between items-center p-10">
                    <div>
                        <h1 className='text-2xl'>Delete All Employees</h1>
                    </div>
                    <div onClick={props.onclick} className='bg-red-500 hover:bg-red-600 rounded text-white cursor-pointer'>
                        <CloseIcon />
                    </div>
                </div>

                <hr />

                <div className="warning space-y-6 m-6">
                    <h1 className='font-semibold'>Are You Sure You Want To Delete All These Records?</h1>

                    <p className='text-sm text-orange-400'>This action can't be Undone.</p>
                </div>

                <div className="form">
                    <form method='post'>

                        <div className='bg-gray-200 h-[100px] flex justify-end items-center'>
                            <div className='mr-14 space-x-6'>
                            <button onClick={props.onclick}>Cancel</button>
                            <button className='bg-red-500 hover:bg-red-600 py-1 px-8 rounded' onClick={handleDelete} type="submit">Delete</button>
                            </div>
                        </div>
                            
                    </form>
                </div>

            </section>

        </main>

      </div>
    </div>
  )
}

export default DeleteTable
