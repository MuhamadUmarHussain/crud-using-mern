import React from 'react';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';


function UpdateTable(props) {

    const updateref = React.useRef();

    function Close(e){

        if(updateref.current === e.target){
            props.onclick();
        }

    }

    const [value,setvalue] = React.useState({
        name:'',
        father_name:'',
        email:'',
        phone:''
    });

    const handleChange = (e) =>{

        setvalue({
            ...value,
            [e.target.name]: e.target.value
        })

    }

    const handleUpdate = async(e)=>{
        e.preventDefault();
        const id = props.id
        try{

            const updateUser = await axios.put(`http://localhost:4000/api/update/${id}`,value);
            const responce = updateUser.data;

            if(responce.sucess){
                toast.success(responce.Message);
            }

                console.log(responce);
        }catch(err){
            console.log(err);
        }
        props.onclick();
    }

    

  return (
    <div>
      <div  className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
        
        <div  ref={updateref} onClick={Close}   className=' h-screen flex justify-center items-center'>
            
            <main className='h-[460px] w-[480px] bg-white'>
                <div className="closeIcon flex justify-between items-center p-10">
                    <div>
                        <h1 className='text-2xl'>Update Employee</h1>
                    </div>
                    <div onClick={props.onclick} className='bg-yellow-500 hover:bg-yellow-600 rounded text-white cursor-pointer'>
                        <CloseIcon />
                    </div>
                </div>

                <hr />

                <div className="form">
                    <form method='post' className='flex flex-col space-y-3'>
                        <div className="name flex flex-col mx-12">
                        <label htmlFor="n_e">Name</label>
                        <input className='border border-black' type="text" name="name" value={value.name} onChange={handleChange} id="n_e" required/>
                        </div>
                        <div className="fatherName flex flex-col mx-12">
                        <label htmlFor="f_n">Father Name</label>
                        <input className='border border-black' type="text" name="father_name" value={value.father_name} onChange={handleChange} id="f_n" required/>
                        </div>
                        <div className="email flex flex-col mx-12">
                        <label htmlFor="e_m">Email</label>
                        <input className='border border-black' type="email" name="email" value={value.email} onChange={handleChange} id="e_m" required/>
                        </div>
                        <div className="phone flex flex-col mx-12">
                        <label htmlFor="p_h">Phone</label>
                        <input className='border border-black' type="number" name="phone" value={value.phone} onChange={handleChange} id="p_h" required />
                        </div>

                        <div className='bg-gray-200 h-[100px] flex justify-end items-center'>
                            <div className='mr-14 space-x-6'>
                            <button onClick={props.onclick}>Cancel</button>
                            <button className='bg-yellow-500 hover:bg-yellow-600 py-1 px-8 rounded' type="submit" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                            
                    </form>
                </div>
            </main>

        </div>

      </div>
    </div>
  )
}

export default UpdateTable
