import { useForm } from 'react-hook-form';
import { Input } from '../../../components/ui/input';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { cn } from '../../../lib/utils';
import { formSchema, FormValues } from '../../../schema/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../contexts/useAuth';
import { Button } from '../../../components/ui/button';
import useNavigation from '../../../custom-hooks/useNavigation';
import { toast } from 'sonner';
const className = 'absolute aspect-square bg-[#1F3A8A1A] dark:bg-[#ffcd0429] rounded-full';

const Login = () => {
  const { login } = useAuth();
  const { t } = useLocalTranslation();
  const navigate = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const el: boolean = await login(data);
    if(el) {
      navigate('/')
      toast.success(t('Logged in successfully'))
    } else {
      toast.error(t('User not found'))
    }
  };
  return (
    <div className="w-screen overflow-hidden h-screen flex items-center bg-light-blue dark:bg-dark-500 justify-center relative">
      <div className={cn(className, 'w-[400px] -right-[250px] -top-20')}></div>
      <div className="bg-white dark:bg-dark relative z-10 shadow-lg rounded-2xl md:p-8 p-5 max-h-[90vh] overflow-y-auto w-[90%] max-w-[475px]">
        <h2 className="text-center text-2lg font-bold mb-5">{t('login')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            error={errors.username?.message}
            {...register('username')}
            label="username"
            theme="gray"
          />
          <Input
            error={errors.password?.message}
            {...register('password')}
            label="password"
            theme="gray"
            type="password"
          />
          <Button>{t('submit')}</Button>
        </form>
      </div>
      <div
        className={cn(
          className,
          'w-[200px] bg-[#1F3A8A33] dark:bg-[#FFCC0459] -left-[100px] bottom-[220px]'
        )}
      ></div>
      <div
        className={cn(className, 'w-[400px] -left-[160px] -bottom-20')}
      ></div>
    </div>
  );
};

export default Login;
