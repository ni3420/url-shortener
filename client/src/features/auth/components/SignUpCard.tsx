import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import type { signupInput } from '../schema';
import { registerSchema} from '../schema';
import { useSignUp } from '../api/use-register';

const SignUpCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const { mutateAsync, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: signupInput) => {
    try {
      await mutateAsync(data);
      setToast({ type: 'success', message: 'Account created successfully!' });
      setTimeout(() => setToast(null), 4000);
    } catch  {
      setToast({ type: 'error', message: 'Registration failed. Try a different email.' });
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="flex w-full max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-base-100 border border-base-200/50 min-h-[650px]">
      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg text-white`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="w-full md:w-1/2 p-8 sm:p-16 flex flex-col justify-center">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-base-content md:text-4xl">
            Get started
          </h1>
          <p className="text-sm text-base-content/60">
            Create your account to unlock full access
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="form-control w-full space-y-2">
            <label className="text-sm font-semibold tracking-wide text-base-content/80" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/40">
                <User size={18} />
              </div>
              <input
                {...register('name')}
                id="name"
                type="text"
                placeholder="John Doe"
                className={`input input-bordered w-full h-12 pl-12 rounded-xl text-sm transition-all duration-200 focus:outline-offset-0
                  ${errors.name ? 'input-error bg-error/5 focus:input-error' : 'focus:input-primary'}`}
              />
            </div>
            {errors.name && (
              <p className="text-xs font-medium text-error mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full space-y-2">
            <label className="text-sm font-semibold tracking-wide text-base-content/80" htmlFor="email">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/40">
                <Mail size={18} />
              </div>
              <input
                {...register('email')}
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`input input-bordered w-full h-12 pl-12 rounded-xl text-sm transition-all duration-200 focus:outline-offset-0
                  ${errors.email ? 'input-error bg-error/5 focus:input-error' : 'focus:input-primary'}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-error mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control w-full space-y-2">
            <label className="text-sm font-semibold tracking-wide text-base-content/80" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-base-content/40">
                <Lock size={18} />
              </div>
              <input
                {...register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`input input-bordered w-full h-12 pl-12 pr-12 rounded-xl text-sm transition-all duration-200 focus:outline-offset-0
                  ${errors.password ? 'input-error bg-error/5 focus:input-error' : 'focus:input-primary'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/40 hover:text-base-content transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-error mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full h-12 text-white font-semibold rounded-xl tracking-wide transition-all duration-200 text-sm normal-case shadow-lg shadow-primary/20 mt-4"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 bg-base-200 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-base-300/40 to-transparent mix-blend-multiply z-10" />
        <img 
          src="/img.svg" 
          alt="Sign up illustration" 
          className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
    </div>
  );
};

export default SignUpCard;