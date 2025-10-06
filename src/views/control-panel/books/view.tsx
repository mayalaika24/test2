import DialogLayout from '../../../layouts/DialogLayout';
import { Button } from '../../../components/ui/button';
import { DialogClose } from '../../../components/ui/dialog';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import RenderField from '../../../components/ui/render-field';
import Icon from '../../../components/ui/icon';
import { Book } from '../../../types/books';

type Props = {
  onClose: VoidFunction;
  header: string;
  data: Book;
};

function ViewDialog({ onClose, data, header }: Props) {
  const { t } = useLocalTranslation();
  console.log(data);
  return (
    <DialogLayout
      header={header}
      onClose={onClose}
      footer={
        <DialogClose asChild>
          <Button variant={'ghost'}>{t('cancel')}</Button>
        </DialogClose>
      }
    >
      <div className="flex flex-col gap-3"></div>
    </DialogLayout>
  );
}

export default ViewDialog;
