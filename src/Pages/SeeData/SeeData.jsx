import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import FormBanner from "../../Shared/FormBanner";
import FillUpFormDataCard from "../../Shared/FillUpFormDataCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
const SeeData = () => {
    // /singleUserFormData/:id/:email
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: storedFormData = [], isLoading: storedFormDataIsLoading, refetch } = useQuery({
        queryKey: [user, `this forms stored Data ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUserFormData/${id}/${user?.email}`)
            return res?.data
        }
    })
    const { data: formDetails, isLoading: formDetailsIsLoading } = useQuery({
        queryKey: [user, `Thanks for Fill up ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/formDetails/${id}`)
            return res?.data
        }
    })
    if (storedFormDataIsLoading || formDetailsIsLoading) {
        return <Loading />
    }
    if (user?.email !== formDetails?.userEmail) {
        signOut(auth)
        navigate('/login')
        return
    }
    return (
        <div>
            {/* img, title, description */}
            <FormBanner img={formDetails?.formBgImg} title={formDetails?.title} description={formDetails?.description} />

            <h2 className="text-2xl font-bold text-center">Stored Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {
                    storedFormData?.map((data, idx) => <FillUpFormDataCard data={data} idx={idx + 1} key={idx} />)
                }
                {
                    storedFormData?.length < 1 && <h2 className="text-3xl font-bold text-center py-10">No Data available!!</h2>
                }
            </div>
        </div>
    );
};

export default SeeData;