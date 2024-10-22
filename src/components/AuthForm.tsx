import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthFormProps, AuthResponse, LoginUser, SignUpParams } from '@/types';
import axiosInstance from '@/lib/axiosInstance';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { auth } from '@/store/auth';

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useRecoilState<AuthResponse | null>(auth);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const formSchema = authFormSchema(type);

  useEffect(()=>{
      const savedTheme = localStorage.getItem("theme") || "light"
      const isDark = savedTheme === "dark"  
  
      document.body.classList.toggle("dark", isDark)
      document.body.classList.toggle("light", !isDark)
  },[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

 
  const handleSignUp = async (data: SignUpParams) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/signup', data);
      console.log(response);
      setUser(response.data);
      if(user){
      toast.success('Successfully registered!');
      nav('/');}
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to register.');
      throw error;
    }
  };

  const handleSignIn = async (data: LoginUser) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/signin', data);
      setUser(response.data);
      toast.success('Signed in successfully!');
      nav('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to sign in.');
      throw error;
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === 'sign-up') {
        await handleSignUp(data as SignUpParams);
      } else if (type === 'sign-in') {
        await handleSignIn(data as LoginUser);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-background w-full flex justify-center'>
    <section className="flex  min-h-screen w-full max-w-[420px] text-text flex-col justify-center gap-3 py-4 md:gap-5">
      <header className="flex flex-col gap-2 md:gap-8">
        <div className="flex cursor-pointer text-primary items-center gap-1" onClick={() => nav('/')}>
          <FaCartPlus className='text-2xl mr-2'/>
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">CORECART</h1>
        </div>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-primary">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign-in' : 'Sign-up'}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? 'Link your account to get started' : 'Please enter your details'}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <button className='bg-primary p-2 w-1/4 rounded-lg' onClick={()=>nav('/')}>Skip</button>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                    <CustomInput
                      control={form.control}
                      name="userName"
                      label="User Name"
                      placeholder="Enter Your Name"
                    />
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Land-Mark"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter Your City"
                  />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="state" label="State" placeholder="State" />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Postal Code"
                    />
                  </div>
                </>
              )}
              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter Your Email" />
              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter Your Password" />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="text-16 rounded-lg bg-primary/90 hover:bg-primary font-semibold text-white shadow-md" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in' ? "Don't have an account ? " : 'Already have an Account ? '}
            </p>
            <span
              className="text-14 cursor-pointer font-medium text-blue-500"
              onClick={() => (type === 'sign-in' ? nav('/auth/register') : nav('/auth/login'))}
            >
              {type === 'sign-in' ? 'sign-up' : 'sign-in'}
            </span>
          </footer>
        </>
      )}
    </section>
    </div>
  );
};

export default AuthForm







//   {
  //     firstName:data.firstName,
  //     lastName:data.lastName,
  //     email: data.email,
  //     password: data.password,
  //     address1: data.address1,
  //     state: data.state,
  //     postalCode:data.postalCode,
  //     dob: data.dob,
  //     ssn: data.ssn,
  // }