/* eslint-disable react/prop-types */
// import React from 'react';

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
const AddFieldModal = ({ open, setOpen, setInputFields, inputFields }) => {
    const [fieldType, setFieldType] = useState('Input')
    // const [inputType, setInputType] = useState('text')
    const [selectedField, setSelectedField] = useState([]);
    const [label, setLabel] = useState('')
    const [selectedFieldValue, setSelectedFieldValue] = useState('')
    const [requirement, setRequirement] = useState('No')
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

    }
    // const handleInputType = (e) => {
    //     e.preventDefault();
    //     setInputType(e.target.value)
    // }
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
        const newSelectedField = selectedField.filter(field => field.id !== id)
        setSelectedField(newSelectedField)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!label) {
            return
        }
        const type = fieldType;
        const required = requirement === 'No' ? false : true;
        let inputFieldData = {};
        if (type === 'Input') {
            inputFieldData = {
                label, type, inputType: 'text'
            }
        } else if (type === 'Textarea') {
            inputFieldData = {
                label, type
            }
        } else if (type === 'Select') {
            if (selectedField.length < 1) {
                return
            }
            inputFieldData = {
                label, type, fields: selectedField
            }
        } else if (type === 'Multiple Choice') {
            if (selectedField.length < 1) {
                return
            }
            inputFieldData = {
                label, type, fields: selectedField
            }
        } else if (type === 'Time') {
            inputFieldData = {
                label, type: 'Input', inputType: 'time'
            }
        } else if (type === 'Date') {
            inputFieldData = {
                label, type: 'Input', inputType: 'date'
            }
        } else if (type === 'Number') {
            inputFieldData = {
                label, type: 'Input', inputType: 'number'
            }
        } else if (type === 'Email') {
            inputFieldData = {
                label, type: 'Input', inputType: 'email'
            }
        } else if (type === 'Upload Image') {
            inputFieldData = {
                label, type: 'Input', inputType: 'file'
            }
        }
        inputFieldData = {
            ...inputFieldData,
            realType: type,
            requirement: required,
            id: new Date().getTime()
        }

        setInputFields([...inputFields, inputFieldData])
        setFieldType('Input')
        // setInputType('text')
        setSelectedField([])
        setLabel('')
        setSelectedFieldValue('')
        setRequirement('No')
        handleClose()
    }
    const oddOptionStyle = 'font-bold bg-black/70'
    const evenOptionStyle = 'font-bold bg-black/70'
    const inputFieldDesign = 'w-full p-3 px-5 rounded-sm bg-black/20 block text-white border border-primary'
    return (
        <Dialog
            open={open}
            size={'sm'}
            handler={setOpen}
            className="max-h-[80vh] relative overflow-y-auto border-primary/50 border-[2px] border-double bg-black/50 rounded-sm scrollable-div2"

        >
            <form onSubmit={handleSubmit} className='flex gap-4 flex-col  py-5 rounded-lg px-5'>
                <div className='text-lg font-extrabold text-white'>
                    Add Input Field
                </div>
                <div className=" w-full min-w-[200px] flex flex-col gap-2">
                    <label className='ml-1 text-white'>Question</label>
                    <input
                        onChange={handleLabel}
                        value={label}
                        type="text" placeholder="Question" className={`${inputFieldDesign}`} />
                </div>
                <div className=" w-full min-w-[200px] flex flex-col gap-2">
                    <label className='ml-1 text-white'>Type</label>
                    <select
                        onChange={handleFieldType}
                        value={fieldType}
                        placeholder="Type" className={`${inputFieldDesign}`}>
                        <option className={oddOptionStyle} value={'Input'}>Short Answer</option>
                        <option className={evenOptionStyle} value={'Textarea'}>Long Answer</option>
                        <option className={oddOptionStyle} value={'Select'}>Dropdown</option>
                        <option className={evenOptionStyle} value={'Multiple Choice'}>Multiple Choice</option>
                        <option className={evenOptionStyle} value={'Time'}>Time</option>
                        <option className={oddOptionStyle} value={'Date'}>Date</option>
                        <option className={evenOptionStyle} value={'Number'}>Number</option>
                        <option className={oddOptionStyle} value={'Email'}>Email</option>
                        <option className={evenOptionStyle} value={'Upload Image'}>Upload Image</option>
                    </select>
                </div>
                {/* <div className={` w-full min-w-[200px] flex-col gap-2 ${fieldType === 'Input' ? 'flex' : 'hidden'}`}>
                    <label className='ml-1 text-white'>Input Type</label>
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
                    </select>
                </div> */}
                <div className={`relative w-full min-w-[200px] flex-col gap-2 ${fieldType === 'Select' ? 'flex' : `${fieldType==='Multiple Choice' ? 'flex' : 'hidden'}`}`}>
                    <label className='ml-1 text-white'>Options</label>
                    <div className={`w-full min-h-5 p-1 rounded-md ${selectedField.length > 0 ? 'gap-2 flex flex-wrap' : 'hidden'}`}>
                        {
                            selectedField.map(field => <span key={field.id} className='bg-primary/90 text-white px-1 flex gap-2 justify-center items-center rounded-sm'><span
                                onClick={() => handleDeleteSelectedField(field?.id)}
                                className='text-xs bg-white text-black rounded-sm px-[2px] cursor-pointer hover:bg-gray-200 transition-all duration-300 active:scale-90'>X</span> {field.value}</span>)
                        }
                    </div>
                    <input
                        onChange={handleSelectedFieldValue}
                        value={selectedFieldValue}
                        placeholder="Option" className={`${inputFieldDesign}`} />
                    <div
                        onClick={handleStoreSelectedValue}
                        className='w-max border border-primary px-2 h-[51.5px] flex justify-center items-center rounded-r-md absolute bottom-0 right-0 hover:bg-white transition-all duration-300 cursor-pointer active:scale-90'>
                        <p className='text-2xl text-white'><TiTickOutline /></p>
                    </div>
                </div>
                <div className=" w-full min-w-[200px] flex flex-col gap-2">
                    <label className='ml-1 text-white'>Required</label>
                    <select
                        value={requirement}
                        onChange={handleRequirement}
                        placeholder="Required" className={`${inputFieldDesign}`}>
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>
            </form>
            <DialogFooter className="sticky bottom-0 right-0  py-2 w-full">
                <div className="w-full h-full absolute  blur-sm bg-black -z-10 bottom-0 left-0"></div>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-3 rounded-sm border border-primary/60 bg-primary/10 hover:border-primary"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-primary/80 hover:bg-primary rounded-sm border border-primary"
                >
                    <span>Add</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default AddFieldModal;