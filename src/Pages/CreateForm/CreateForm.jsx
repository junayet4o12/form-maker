// import React from 'react';
import formBg from '../../assets/formbg.jpg'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Input, Textarea } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import CreatedForm from './CreatedForm';
import ComponentsTitle from '../../Shared/ComponentsTitle';
import { useState } from 'react';
import { TiTickOutline } from "react-icons/ti";
import createCardImg from '../../assets/createForm.jpg'
const CreateForm = () => {
    const [fieldType, setFieldType] = useState('Input')
    const [selectedField, setSelectedField] = useState([]);
    const [selectedFieldValue, setSelectedFieldValue] = useState('')
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    // imgBB image hosting api link  st
    // imgBB image hosting api link
    // const onSubmit = async (data) => {
    //     const label = data?.label;
    //     const type = fieldType;
    //     const inputType = data?.inputType;
    //     const required = data?.required === 'No' ? false : true;
    //     let inputFieldData = {};
    //     
    //     if (type === 'Input') {
    //         inputFieldData = {
    //             label, type, inputType
    //         }
    //     } else if (type === 'Textarea') {
    //         inputFieldData = {
    //             label, type
    //         }
    //     } else if (type === 'Select') {
    //         if (selectedField.length < 1) {
    //             return ;
    //         }
    //         inputFieldData = {
    //             label, type, fields: selectedField
    //         }
    //     }


    //     Swal.fire({
    //         title: "Are you sure to create this input field?",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, Create."
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             inputFieldData = {
    //                 ...inputFieldData,
    //                 id: new Date().getTime(),
    //                 requirement: required
    //             }
    //             ;
    //             setInputFields([...inputFields, inputFieldData])
    //             reset()
    //             setFieldType('Input')
    //             setSelectedField([])
    //         }
    //     });


    // }
    return (
        <div className='mb-10'>
            <ComponentsTitle title1={'Create a Form'} title2={'Through'} title3={'Formify'} description={`Easily design bespoke forms using Formify's intuitive interface. Streamline data collection and enhance collaboration effortlessly. Get started with Formify today!`} />
            <div className=" px-7 flex justify-center gap-10 flex-col-reverse lg:flex-row">
                {/* <div style={{ backgroundImage: `url(${formBg})` }} className="bg-cover bg-center   rounded-md font-bold text-sm w-full max-w-[550px]   mx-auto flex flex-col gap-3 border-[1.5px] border-gray-400 shadow-xl shadow-[#bdb9b9] ">
                    <div className='h-full w-full p-4 py-7 flex flex-col bg-[#ffffffb3] gap-5 rounded-md '>
                        <h2 className='text-4xl font-bold text-center py-5'>Create your form</h2>
                        <div className='flex gap-4 flex-col '>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <Input
                                    onChange={handleFormTitle}
                                    value={formTitle}
                                    label="Form Title" />
                            </div>
                            <div className="relative w-full min-w-[200px]">
                                <Textarea
                                    onChange={handleFormDescription}
                                    value={formDescription}
                                    label="Form Description" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col border-2 border-secondary p-2 py-5 rounded-lg'>
                            <div className='text-lg font-extrabold'>
                                Create Input Field
                            </div>
                            <hr className='border border-primary -mx-2' />
                            <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                                <label className='ml-1'>Label</label>
                                <input
                                    {...register("label", { required: true })}
                                    type="text" placeholder="Label" className="input input-bordered input-primary w-full h-11" />
                            </div>
                            <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                                <label className='ml-1'>Type</label>
                                <select
                                    onChange={handleFieldType}
                                    placeholder="Type" className="select select-primary w-full h-11">
                                    <option>Input</option>
                                    <option>Textarea</option>
                                    <option>Select</option>
                                </select>
                            </div>
                            <div className={`relative w-full min-w-[200px] flex-col gap-2 ${fieldType === 'Input' ? 'flex' : 'hidden'}`}>
                                <label className='ml-1'>Input Type</label>
                                <select
                                    {...register("inputType")}
                                    placeholder="Input Type" className="select select-primary w-full h-11">
                                    <option>text</option>
                                    <option>number</option>
                                    <option>date</option>
                                    <option>time</option>
                                    <option>file</option>
                                    <option>email</option>
                                    <option>checkbox</option>
                                    <option>radio</option>
                                    <option>submit</option>
                                </select>
                            </div>
                            <div className={`relative w-full min-w-[200px] flex-col gap-2 ${fieldType === 'Select' ? 'flex' : 'hidden'}`}>
                                <label className='ml-1'>Selected Field</label>
                                <div className={`w-full min-h-5 p-1 rounded-md ${selectedField.length > 0 ? 'gap-2 flex flex-wrap' : 'hidden'}`}>
                                    {
                                        selectedField.map(field => <span key={field.id} className='bg-blue-700 text-white px-1 rounded flex gap-2 justify-center items-center'><span
                                            onClick={() => handleDeleteSelectedField(field?.id)}
                                            className='text-xs bg-white text-black rounded-md px-[2px] cursor-pointer hover:bg-gray-200 transition-all duration-300 active:scale-90'>X</span> {field.value}</span>)
                                    }
                                </div>
                                <input
                                    onChange={handleSelectedFieldValue}
                                    value={selectedFieldValue}
                                    placeholder="SelectedField" className="input input-primary w-full h-11" />
                                <div
                                    onClick={handleStoreSelectedValue}
                                    className='w-max border border-black px-2 h-11 flex justify-center items-center rounded-r-lg absolute bottom-0 right-0 hover:bg-gray-300 transition-all duration-300 cursor-pointer active:scale-90'>
                                    <p className='text-2xl'><TiTickOutline /></p>
                                </div>
                            </div>
                            <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                                <label className='ml-1'>Required</label>
                                <select
                                    {...register("required")}
                                    placeholder="Required" className="select select-primary w-full h-11">
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-neutral bg-primary/90 hover:bg-primary text-sm font-bold  text-white border-none w-[140px] h-10' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div> */}
                <div className='w-full relative'>
                    <div className='w-full'>
                        <CreatedForm  />
                        {/* <div className='w-full hidden lg:block'>
                            <img className={`${!formTitle ? 'block' : 'hidden'} ${inputFields.length < 1 ? 'block' : 'hidden'} w-2/3 mx-auto`} src={createCardImg} alt="" />
                        </div> */}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateForm;