import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const ref = useRef()
    const [passwordArray, setpasswordArray] = useState([])
    const passRef = useRef()

    const getpassword = async() => { 
        let req = await fetch("http://localhost:3000")
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)
     }

    useEffect(() => {
        getpassword()
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passRef.current.type = "text"
        }
    }

    const savePassword = async() => {
        // using condition to check that password length must be  greater than 3
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // edit logic: delete the password (previous entry) that was edited and then save the new one
            await fetch("http://localhost:3000", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id: form.id })})

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})

            console.log([...passwordArray, { ...form, id: uuidv4() }])
            //reset the form
            setform({ site: "", username: "", password: "" })
            //
            toast('🦄 Password saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error: Password not saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",})
        }
    }

    const deletePassword = async(id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do you want to delete this Password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id })})


            console.log('removing from local storage')
            toast('Password deleted successfully!!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            console.log("Password not deleted")
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform({...passwordArray.filter(item => item.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}
            {/* <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#D0F7D6,transparent)]"></div></div> */}
            <div className="md:container px-2 md:px-40 py-8 md:py-16 mx-auto md:mx-auto md:w-4/5 flex flex-col overflow-x-hidden md:overflow-x-auto md:min-h-[82.5vh]">

                <div className="upper flex flex-col mb-[20px]">
                    <div className="logo font-bold text-4xl flex justify-center mb-[10px]">
                        <span className='text-green-500'>&lt;</span>
                        Pass
                        <span className='text-green-500'>OP</span>
                        <span className='text-green-500'>/&gt;</span>
                    </div>
                    <p className='flex justify-center text-green-900'>Your own password manager</p>
                </div>

                <div className="lower flex flex-col p-4 items-center ">
                    <input value={form.site} onChange={handleChange} className='bg-white border border-green-500 rounded-full w-full m-[10px] px-4 py-1' placeholder='Enter website URL' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row gap-6 m-[10px] w-full md:justify-between">

                        <input value={form.username} onChange={handleChange} className='bg-white border border-green-500 rounded-full md:w-2/3 w-full px-4 py-1' placeholder='Enter Username' type="text" name='username' id='username' />
                        <div className='icon relative w-full md:w-1/3'>

                            <input ref={passRef} value={form.password} onChange={handleChange} className='bg-white border border-green-500 rounded-full w-full px-4 py-1' placeholder='Enter Password' type="password" name='password' id='password' />
                            <span className='absolute right-1.5' onClick={showPassword}>
                                <img ref={ref} className='p-1 cursor-pointer' width={34} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='save-btn bg-green-600 hover:bg-green-400 rounded-full flex justify-center items-center w-fit py-2 px-10 m-[10px] my-10 cursor-pointer gap-1 font-medium'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords flex flex-col justify-center items-center">
                    <h2 className='font-bold text-2xl py-4'>My Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}

                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {

                                return <tr className='w-full' key={index}>
                                    <td className=' py-2 border-2 border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <a href={item.site} target='_blank'>
                                                {item.site}</a>
                                            <span className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>

                                    <td className='py-2 border-2 border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            {item.username}
                                            <span className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>

                                    <td className='py-2 border-2 border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            {"*".repeat(item.password.length)}
                                            <span className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>

                                    <td className='py-2 border-2 border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager