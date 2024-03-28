// import React from 'react';
import formBg from '../../assets/formbg.jpg'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import CreatedForm from './CreatedForm';
import ComponentsTitle from '../../Shared/ComponentsTitle';
import { useState } from 'react';
const CreateForm = () => {
    const [formTitle, setFormTitle] = useState('');
    const [inputFields, setInputFields] = useState([])
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    // imgBB image hosting api link  st
    // imgBB image hosting api link
    const handleFormTitle = (e) => {
        e.preventDefault();
        setFormTitle(e.target.value)
    }
    const onSubmit = async (data) => {
        const label = data?.label;
        const type = data?.type;
        const inputType = data?.inputType;
        const inputFieldData = {
            label, type, inputType
        }
        console.log(inputFieldData);
        setInputFields([...inputFields, inputFieldData])
    }
    return (
        <div>
            <ComponentsTitle title1={'Create a Form'} title2={'Through'} title3={'Formify'} description={`Easily design bespoke forms using Formify's intuitive interface. Streamline data collection and enhance collaboration effortlessly. Get started with Formify today!`} />
            <div className="py-7 px-7 flex ">
                <div style={{ backgroundImage: `url(${formBg})` }} className="bg-cover bg-center   rounded-md font-bold text-sm w-full max-w-[550px]   mx-auto flex flex-col gap-3 border-[1.5px] border-gray-400 shadow-xl shadow-[#bdb9b9]">
                    <div className='h-full w-full p-4 py-7 flex flex-col bg-[#ffffffb3] gap-5 rounded-md '>
                        <h2 className='text-4xl font-bold text-center py-5'>Create your form</h2>
                        <div className='flex gap-4 flex-col '>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <Input
                                    onChange={handleFormTitle}
                                    label="Form Title" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col '>
                            <div className='text-base font-medium'>
                                Create Input Field
                            </div> 
                            <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                                <label className='ml-1'>Label</label>
                                <input
                                    {...register("label", { required: true })}
                                    type="text" placeholder="Label" className="input input-bordered input-primary w-full h-11" />
                            </div>
                            <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                                <label className='ml-1'>Type</label>
                                <select
                                    {...register("type", { required: true })}
                                    placeholder="Type" className="select select-primary w-full h-11">
                                    <option>Input</option>
                                    <option>Textarea</option>
                                    <option>Select</option>
                                </select>
                            </div>
                            <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                                <label className='ml-1'>Input Type</label>
                                <select
                                    {...register("inputType", { required: true })}
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
                            <div className='text-center'>
                                <button className='btn btn-neutral bg-primary/90 hover:bg-primary text-sm font-bold  text-white border-none w-[140px] h-10' type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <CreatedForm formTitle={formTitle} inputFields={inputFields} />
            </div>
        </div>
    );
};

export default CreateForm;