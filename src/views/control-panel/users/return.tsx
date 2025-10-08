import DialogLayout from '../../../layouts/DialogLayout';
import { Button } from '../../../components/ui/button';
import { DialogClose } from '../../../components/ui/dialog';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { User } from '../../../types/users';
import { booksService } from '../../../services/BooksService';
import { toast } from 'sonner';
import useTriggerValue from '../../../custom-hooks/useTriggerValue';

type Props = {
  onClose: VoidFunction;
  header: string;
  data: User;
  onSuccess: VoidFunction;
};

function ReturnDialog({ onClose, data, header, onSuccess }: Props) {
  const { t } = useLocalTranslation();
  const { value, handleTriggerValue } = useTriggerValue();
  const handleReturn = async (id: string) => {
    await booksService.returnBook(id, data);
    setTimeout(() => {
      toast.success(t('Book returned successfully'));
      handleTriggerValue();
      onSuccess();
    }, 200);
  };
  return (
    <DialogLayout
      header={header}
      onClose={onClose}
      closeTrigger={value}
      footer={
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant={'ghost'}>{t('cancel')}</Button>
          </DialogClose>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {data.borrowedBooks.length ? (
          data.borrowedBooks.map((el) => {
            return (
              <div
                className="flex items-center justify-between gap-4"
                key={el.id}
              >
                <span>{el.title}</span>
                <button
                  className="bg-secondary px-4 py-1 rounded-sm"
                  onClick={() => handleReturn(el.id)}
                >
                  {t('return')}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center">{t('There is no borrowed books')}</p>
        )}
      </div>
    </DialogLayout>
  );
}

export default ReturnDialog;
