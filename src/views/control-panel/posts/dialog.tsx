import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useAuth } from '../../../contexts/useAuth';
import DialogLayout from '../../../layouts/DialogLayout';
import { FormValues } from '../../../schema/posts';
import useFetch from './fetch';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import useTriggerValue from '../../../custom-hooks/useTriggerValue';
import { Post } from '../../../types/posts';

function Dialog({
  header,
  onClose,
  post = undefined,
}: {
  post?: Post;
  header: string;
  onClose: VoidFunction;
}) {
  const { t } = useLocalTranslation();
  const { register, errors, handleSubmit, mutate, isPending, updateMutate, isUpdatePending } = useFetch();
  const { value, handleTriggerValue } = useTriggerValue();
  const { user } = useAuth();
  const onSubmit = (data: FormValues) => {
    if (user?.id) {
      const payload = { ...data, userId: user.id };
      if(post) {
        updateMutate({data: payload, id: post.id})
      } else {
        mutate(payload);
      }
      handleTriggerValue();
    }
  };
  return (
    <DialogLayout
      header={header}
      onClose={onClose}
      closeTrigger={value}
      footer={
        <Button onClick={handleSubmit(onSubmit)} disabled={isPending || isUpdatePending}>
          {t('submit')}
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>{t('title')}*:</label>
        <Input {...register('title')} error={errors.title?.message} />
      </form>
    </DialogLayout>
  );
}

export default Dialog;
