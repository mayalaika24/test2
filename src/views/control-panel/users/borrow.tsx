import DialogLayout from '../../../layouts/DialogLayout';
import { Button } from '../../../components/ui/button';
import { DialogClose } from '../../../components/ui/dialog';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { User } from '../../../types/users';
import { useQuery } from '@tanstack/react-query';
import { booksService } from '../../../services/BooksService';
import Select from '../../../components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';
import useTriggerValue from '../../../custom-hooks/useTriggerValue';

type Props = {
  onClose: VoidFunction;
  header: string;
  data: User;
  onSuccess: VoidFunction;
};

function BorrowDialog({ onClose, data, header, onSuccess }: Props) {
  const { t } = useLocalTranslation();
  const { value, handleTriggerValue } = useTriggerValue();
  const [book, setBook] = useState<string>('');
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: () => booksService.getData(),
    staleTime: 0,
    refetchOnMount: true,
    refetchInterval: false,
  });
  const handleClick = async () => {
    await booksService.borrowBook(book, data);
    setTimeout(() => {
      toast.success(t('Book borrowed successfully'));
      handleTriggerValue();
      onSuccess();
    }, 200);
  };
  return (
    <DialogLayout
      header={t(header)}
      onClose={onClose}
      closeTrigger={value}
      footer={
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant={'ghost'}>{t('cancel')}</Button>
          </DialogClose>
          <Button disabled={!book} onClick={handleClick}>
            {t('submit')}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <Select
          label="Book"
          options={
            books
              ?.filter((book) => !book.isBorrowed)
              .map((book) => ({ id: book.id, name: book.title })) || []
          }
          onSelect={(val) => setBook(val)}
        />
      </div>
    </DialogLayout>
  );
}

export default BorrowDialog;
