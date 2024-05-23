import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import ComponentsTitle from "../../Shared/ComponentsTitle";
import { useState } from "react";
import Viewer from "./Viewer";
import AddViewersModal from "./AddViewersModal";

const SubOrdinate = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [showViewersHideEditors, setShowViewersHideEditors] = useState(true)
    const [openViewersModal, setOpenViewersModal] = useState(false)
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading, refetch } = useQuery({
        queryKey: [user, `subOrdinate ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/formDetailsForUpdateAndDelete/${id}`)
            return res?.data
        }
    })
    if (formDetailsIsLoading) {
        return <Loading />
    }
    const handleSetShowIndividualDataHideTableFormat = () => {
        setShowViewersHideEditors(true)
    }
    const handleHideViewersShowEditors = () => {
        setShowViewersHideEditors(false)
    }
    const { viewers, editors } = formDetails
    return (
        <div className=" px-5 sm:px-10">
            <ComponentsTitle title1={'Make subordinate'} title2={'For'} title3={`${formDetails?.title}`} />
            <div>
                <ul className="flex gap-5 justify-center items-center py-4 text-white">
                    <li className={`transition-all duration-300 cursor-pointer border-b-2 ${showViewersHideEditors ? ' border-primary' : 'border-transparent'}`} onClick={handleSetShowIndividualDataHideTableFormat}>Viewers({viewers?.length})</li>
                    {/* <li className={`transition-all duration-300 cursor-pointer border-b-2 ${!showViewersHideEditors ? ' border-primary' : 'border-transparent'}`} onClick={handleHideViewersShowEditors}>Editors</li> */}
                </ul>
                <div className="flex justify-center items-center gap-5 flex-col">
                    {
                        viewers?.map((viewer, idx) => <Viewer key={idx} viewer={viewer} idx={idx+1} id={id} refetch={refetch} />)
                    }
                    {/* <Viewer viewer={'hello@gmail.com'} idx={1} /> */}
                    <button onClick={()=>setOpenViewersModal(true)} className='btn btn-sm rounded-sm bg-primary/90 hover:bg-primary text-white border-primary hover:border-primary px-5'>+ Add Viewers</button>
                </div>
            </div>
            <AddViewersModal open={openViewersModal} setOpen={setOpenViewersModal} id={id} refetch={refetch}  viewers={viewers} />
        </div>
    );
};

export default SubOrdinate;