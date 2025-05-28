import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import OtpModal from '../otherComponents/OtpModal';
// import { useCreateUser, useSendOtp, useVerifyOtp } from '@/hooks/userHooks';
import { toast } from 'react-toastify';
import type { SignupValues } from '@/types/signupType';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, userSignup, verifyOtp } from '@/services/user/userServices';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
}



function SignUp() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [showOtpModal, setShowOtpModal] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const signupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character'),

        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    })


    const handleSubmit = async (value: SignupValues) => {
        setEmail(value.email)
        setPassword(value.password)
        try {
            const sendOtpReponse = await sendOtp(value.email)
            toast.success(sendOtpReponse.message)
            setShowOtpModal(true)
        } catch (error) {
            console.log('error while sending otp', error)
            toast.error(error as string)

        }
    }

    const handleVerifyOtp = async (otp: string) => {
        try {
            const verifyOtpResponse = await verifyOtp(email, otp)
            toast.success(verifyOtpResponse.message)
            const user = {
                email,
                password
            }
            await userSignup(user)
            setShowOtpModal(false)
            navigate('/', { replace: true })
        } catch (error) {
            console.log('error while verifying otp', error)
            if (error instanceof Error) toast.error(error.message)
        }
    }

    return (
        <>
            {showOtpModal && <OtpModal isOpen={showOtpModal} onClose={() => setShowOtpModal(false)} onVerify={handleVerifyOtp} />}
            <Formik
                validationSchema={signupSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >

                <div className='h-screen w-full flex items-center justify-center bg-black'>
                    <div className='w-3/4 h-3/4 md:h-1/2 md:w-1/2 xl:w-1/4 bg-black m-4 border rounded-2xl flex flex-col items-center justify-center'>
                        <h1 className="text-white tex-xl  md:text-2xl pt-5 text-center font-semibold">Sign up</h1>
                        <Form className="w-full m-10 px-5 flex flex-col items-center">
                            <Field
                                type="email"
                                name="email"
                                className="border p-2 bg-white my-3 w-full text-black rounded focus:ring-2 focus:outline-none focus:ring-stone-600 focus:shadow-[0_0px_15px_rgba(255,255,255,0.5)]"
                                placeholder='Enter email'
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <div className="bg-white rounded  focus:ring-2 px-3 w-full flex focus:ring-stone-600 focus:shadow-[0_0px_15px_rgba(255,255,255,0.5)]">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className=" p-2 grow-1 bg-transparent  w-1/2 text-black focus:outline-none outline-none"
                                    placeholder='Enter password'
                                />
                                <div
                                    className="  bg-white cursor-pointer flex items-center text-stone-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <div className="bg-white rounded  focus:ring-2 px-3 w-full m-4 flex focus:ring-stone-600 focus:shadow-[0_0px_15px_rgba(255,255,255,0.5)]">
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className=" p-2 grow-1 bg-transparent  w-1/2 text-black focus:outline-none outline-none"
                                    placeholder='Enter password'
                                />
                                <div
                                    className="  bg-white cursor-pointer flex items-center text-stone-700"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <Button type="submit" className="bg-white mt-10 text-black">SignUp</Button>
                        </Form>
                        <div className="flex">
                            <p className="text-white pe-3">Already have a account Login here</p>
                            <Link className=" text-blue-500" to={'/'}>Login</Link>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    )
}

export default SignUp
