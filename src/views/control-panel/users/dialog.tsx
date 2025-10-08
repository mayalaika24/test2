import { Button } from '../../../components/ui/button';
import DialogLayout from '../../../layouts/DialogLayout';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import useTriggerValue from '../../../custom-hooks/useTriggerValue';
import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { VoidFun } from '../../../types';
import { formSchema, FormValues } from '../../../schema/users';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { GENRE } from '../../../constants';
import { toast } from 'sonner';
import { User } from '../../../types/users';
import { usersService } from '../../../services/UsersService';
function Dialog({
  header,
  onClose,
  passedData = undefined,
  onSuccess,
}: {
  passedData?: User;
  header: string;
  onClose: VoidFunction;
  onSuccess: VoidFun<User>;
  length: number;
}) {
  const { t, currentLanguage } = useLocalTranslation();
  const options = useMemo(() => {
    return GENRE.map((genre) => ({ id: genre, name: t(genre) }));
  }, [currentLanguage]);
  const { value, handleTriggerValue } = useTriggerValue();
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      borrowedBooks: [],
      id: uuidv4(),
    };
    if (passedData) {
      usersService.updateUser(passedData.id, payload);
      toast.success(t('User edited successfully'));
    } else {
      usersService.addUser(payload);
      toast.success(t('User added successfully'));
    }
    onSuccess(payload);
    handleTriggerValue();
  };
  useEffect(() => {
    if (passedData) {
      reset({
        name: passedData.name,
        email: passedData.email,
        phone: passedData.phone,
        address: passedData.address,
      });
    }
  }, []);
  return (
    <DialogLayout
      header={header}
      onClose={onClose}
      closeTrigger={value}
      footer={<Button onClick={handleSubmit(onSubmit)}>{t('submit')}</Button>}
    >
      <form className="flex flex-col gap-2">
        <Input
          {...register('name')}
          label="Name"
          error={errors.name?.message}
        />
        <Input
          {...register('email')}
          label="Email"
          error={errors.email?.message}
        />
        <Input
          {...register('phone')}
          label="Phone"
          error={errors.phone?.message}
        />
        <Input
          {...register('address')}
          label="Address"
          error={errors.address?.message}
        />
      </form>
    </DialogLayout>
  );
}

export default Dialog;
