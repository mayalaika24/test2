import React from 'react';
import DialogLayout from '../../../layouts/DialogLayout';
import { Button } from '../../ui/button';
import { DialogClose } from '../../ui/dialog';
import { DialogDataType } from '../../../types';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
const DeleteDialog: React.FC<DialogDataType & { onSubmit: VoidFunction }> = ({
  header,
  children,
  onClose,
  onSubmit,
  trigger = 1,
  loading = false,
}) => {
  const { t } = useLocalTranslation();
  return (
    <DialogLayout
      closeTrigger={trigger}
      onClose={onClose}
      className="max-w-[435px]"
      header={`${t('delete')} ${t(header)}`}
      footer={
        <div className="w-full flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant={'ghost'}>{t('cancel')}</Button>
          </DialogClose>
          <Button disabled={loading} onClick={onSubmit} variant={'destructive'}>
            {t('delete')}
          </Button>
        </div>
      }
    >
      <p>
        {t('insure_delete')}{' '}
        <span className="text-black dark:text-silver uppercase font-semibold">{children}?</span>
      </p>
    </DialogLayout>
  );
};

export default DeleteDialog;
