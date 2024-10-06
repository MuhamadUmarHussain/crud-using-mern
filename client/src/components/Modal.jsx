import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import toast from 'react-hot-toast';

function Modal(props) {
    const modelref = React.useRef();
    const CloseModal = (e) => {
        if (modelref.current === e.target) {
            props.onclick();
        }
    }

    const [value, setValue] = React.useState({
        name:"",
        father_name:"",
        email:"",
        phone:""
    })

    function handleChange(e){
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

     async function handleClick(e){
        e.preventDefault();
        try {
            const newUser = await axios.post("http://localhost:4000/api/create", value);

            const responce = newUser.data;
            if(responce.sucess){
                toast.success(responce.Message);
            }
            console.log(responce);
            
        } catch (error) {
            console.log(error); 
        }
        props.onclick()
    }

  return (
    <div >
      <div  className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
        
        <div ref={modelref} onClick={CloseModal}  className=' h-screen flex justify-center items-center'>
            
            <main className='h-[460px] w-[480px] bg-white'>
                <div className="closeIcon flex justify-between items-center p-10">
                    <div>
                        <h1 className='text-2xl'>Add Employee</h1>
                    </div>
                    <div onClick={props.onclick} className='bg-blue-500 hover:bg-blue-700 cursor-pointer text-white rounded'>
                        <CloseIcon />
                    </div>
                </div>

                <hr />

                <div className="form">
                    <form method='post' className='flex flex-col space-y-3'>
                        <div className="name flex flex-col mx-12">
                        <label htmlFor="n_e">Name</label>
                        <input className='border border-black' type="text" value={value.name} onChange={handleChange} name="name" id="n_e" required/>
                        </div>
                        <div className="fatherName flex flex-col mx-12">
                        <label htmlFor="f_n">Father Name</label>
                        <input className='border border-black' type="text" value={value.father_name} onChange={handleChange} name="father_name" id="f_n" required/>
                        </div>
                        <div className="email flex flex-col mx-12">
                        <label htmlFor="e_m">Email</label>
                        <input className='border border-black' type="email" value={value.email} onChange={handleChange} name="email" id="e_m" required/>
                        </div>
                        <div className="phone flex flex-col mx-12">
                        <label htmlFor="p_h">Phone</label>
                        <input className='border border-black' type="number" value={value.phone} onChange={handleChange} name="phone" id="p_h" required />
                        </div>

                        <div className='bg-gray-200 h-[100px] flex justify-end items-center'>
                            <div className='mr-14 space-x-6'>
                            <button onClick={props.onclick}>Cancel</button>
                            <button className='bg-blue-500 hover:bg-blue-600 py-1 px-8 rounded' type="submit" onClick={handleClick} >Add</button>
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

export default Modal;
