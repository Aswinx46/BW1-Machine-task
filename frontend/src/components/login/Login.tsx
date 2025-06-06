import { Button } from "../ui/button"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { LoginType } from "@/types/loginTypes";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { addUser } from "@/store/slices/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "@/services/user/userServices";
import { addToken } from "@/store/slices/token/tokenSlice";
const initialValues = {
  email: '',
  password: ''
}
function Login() {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const LoginSchema = Yup.object().shape({
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
  });



  const navigate = useNavigate()

  const login = async (values: LoginType) => {
    try {
      setLoading(true)
      const loginResponse = await userLogin(values.email, values.password)
      toast.success(loginResponse.message)
      dispatch(addUser(loginResponse.user))
      dispatch(addToken(loginResponse.accessToken))
      navigate('/dashboard')
    } catch (error) {
      setLoading(false)
      console.log('error while user login', error)
      if (error instanceof Error) toast.error(error.message)
    }
  }



  return (
    <>
      <Formik initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={login}>
        <div className='flex flex-col items-center justify-center bg-black w-full h-screen'>
          <div className=" h-1/2 lg:w-1/4  flex flex-col items-center gap-5 border rounded-2xl justify-center">
            <h1 className="text-white tex-xl  md:text-2xl  text-center font-semibold">LOGIN</h1>
            <Form className="w-full m-10 flex flex-col items-center">
              <Field
                type="email"
                name="email"
                className="border p-2 bg-white my-3 w-1/2 text-black rounded focus:ring-2 focus:outline-none focus:ring-stone-600 focus:shadow-[0_0px_15px_rgba(255,255,255,0.5)]"
                placeholder='Enter email'
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="bg-white rounded  focus:ring-2 px-3 flex focus:ring-stone-600 focus:shadow-[0_0px_15px_rgba(255,255,255,0.5)]">
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
              <Button type="submit" className="bg-white mt-10 text-black">{loading ? 'Logining...' : 'Login'}</Button>
            </Form>
            <div className="flex">
              <p className="text-white pe-3">Dont have a account signup here</p>
              <Link className=" text-blue-500" to={'/signUp'}>SIGNUP</Link>
            </div>
          </div>
        </div>
      </Formik>
    </>
  )
}

export default Login
