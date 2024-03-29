/* eslint-disable react/prop-types */
// import React from 'react';

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TiTickOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateModalForm = ({ open, setOpen, inputField, setInputFields, inputFields }) => {
    console.log(inputField.inputType);
    const [fieldType, setFieldType] = useState(inputField.type || 'Input')
    const [inputType, setInputType] = useState(inputField.inputType || 'text')
    const [selectedField, setSelectedField] = useState(inputField.fields || []);
    const [label, setLabel] = useState(inputField?.label || '')
    const [selectedFieldValue, setSelectedFieldValue] = useState('')
    const [requirement, setRequirement] = useState(inputField?.requirement ? 'Yes' : 'No')
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }
    const handleLabel = (e) => {
        e.preventDefault();
        setLabel(e.target.value)
    }
    const handleFieldType = (e) => {
        e.preventDefault();
        setFieldType(e.target.value)
        console.log(fieldType);

    }
    const handleInputType = (e) => {
        e.preventDefault();
        setInputType(e.target.value)
    }
    const handleSelectedFieldValue = (e) => {
        e.preventDefault();
        setSelectedFieldValue(e.target.value)
    }
    const handleStoreSelectedValue = () => {
        if (selectedFieldValue) {
            const newSelectedValue = {
                id: new Date().getTime(),
                value: selectedFieldValue
            }
            setSelectedField([...selectedField, newSelectedValue])
            setSelectedFieldValue('')
        }
    }
    const handleRequirement = (e) => {
        e.preventDefault();
        setRequirement(e.target.value)
    }
    const handleDeleteSelectedField = (id) => {
        console.log(id);
        const newSelectedField = selectedField.filter(field => field.id !== id)
        console.log(newSelectedField.length);
        setSelectedField(newSelectedField)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const type = fieldType;
        const required = requirement === 'No' ? false : true;
        let inputFieldData = {};
        console.log(type);
        if (type === 'Input') {
            inputFieldData = {
                label, type, inputType
            }
        } else if (type === 'Textarea') {
            inputFieldData = {
                label, type
            }
        } else if (type === 'Select') {
            if (selectedField.length < 1) {
                return console.log('not allowed');
            }
            inputFieldData = {
                label, type, fields: selectedField
            }
        }
        inputFieldData = {
            ...inputFieldData,
            requirement: required,
            id: inputField.id
        }
        const newInputFields = [...inputFields];
        newInputFields?.splice(inputFields.indexOf(inputField), 1, inputFieldData)

        console.log(newInputFields);
        setInputFields(newInputFields)
        handleClose()

    }
    return (
        <Dialog
            open={open}
            size={'xs'}
            handler={setOpen}
            className="max-h-[80vh] overflow-y-auto"

        >
            <form onSubmit={handleSubmit} className='flex gap-4 flex-col  p-2 py-5 rounded-lg'>
                <div className='text-lg font-extrabold'>
                    Update Input Field
                </div>
                <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                    <label className='ml-1'>Label</label>
                    <input
                        onChange={handleLabel}
                        value={label}
                        type="text" placeholder="Label" className="input input-bordered input-primary w-full h-11" />
                </div>
                <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                    <label className='ml-1'>Type</label>
                    <select
                        onChange={handleFieldType}
                        value={fieldType}
                        placeholder="Type" className="select select-primary w-full h-11">
                        <option>Input</option>
                        <option>Textarea</option>
                        <option>Select</option>
                    </select>
                </div>
                <div className={`relative w-full min-w-[200px] flex-col gap-2 ${fieldType === 'Input' ? 'flex' : 'hidden'}`}>
                    <label className='ml-1'>Input Type</label>
                    <select
                        onChange={handleInputType}
                        value={inputType}
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
                        placeholder="Selected Field" className="input input-primary w-full h-11" />
                    <div
                        onClick={handleStoreSelectedValue}
                        className='w-max border border-black px-2 h-11 flex justify-center items-center rounded-r-lg absolute bottom-0 right-0 hover:bg-gray-300 transition-all duration-300 cursor-pointer active:scale-90'>
                        <p className='text-2xl'><TiTickOutline /></p>
                    </div>
                </div>
                <div className="relative w-full min-w-[200px] flex flex-col gap-2">
                    <label className='ml-1'>Required</label>
                    <select
                        value={requirement}
                        onChange={handleRequirement}
                        placeholder="Required" className="select select-primary w-full h-11">
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>
            </form>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-secondary"
                >
                    <span>Update</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default UpdateModalForm;