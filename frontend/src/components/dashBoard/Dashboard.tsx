import { useDispatch, useSelector } from 'react-redux'
import CameraCapture from '../otherComponents/cameraComponent/CameraCapture'
import type { RootState } from '@/store/store'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '@/services/user/userServices'
import { Button } from '../ui/button'
import { removeUser } from '@/store/slices/user/userSlice'
import { removeToken } from '@/store/slices/token/tokenSlice'

function Dashboard() {

    const user = useSelector((state: RootState) => state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    if (!user) {
        // toast.error("Please Login")
        navigate('/')
        return
    }
    const handleLogout = async () => {
        userLogout()
        dispatch(removeUser(null))
        dispatch(removeToken(null))
        navigate('/')
    }
    return (
        <div className='bg-black w-full h-screen flex flex-col justify-center items-center overflow-y-scroll'>
            <div className='flex justify-end'>
                <Button className='bg-red-500 hover:bg-red-400' onClick={handleLogout}>LOGOUT</Button>
            </div>
            <div>
                <h1 className='text-white mb-10 font-semibold text-center'>CURRENT UPDATED DOCUMENT</h1>
                {user.kycType == 'image' ? <img src={user.kyc} className='object-cover'></img> : <video
                    autoPlay
                    muted
                    playsInline
                    controls
                    src={user.kyc}
                    className="w-full max-w-md rounded shadow"
                ></video>}
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='text-white mb-10 font-semibold'>{user.kyc ? 'Change Document' : 'VERIFY YOUR KYC NOW'}</h1>
                <CameraCapture email={user.email!} />
            </div>
        </div>
    )
}

export default Dashboard
