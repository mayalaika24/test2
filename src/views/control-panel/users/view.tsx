import DialogLayout from '../../../layouts/DialogLayout';
import { Button } from '../../../components/ui/button';
import { DialogClose } from '../../../components/ui/dialog';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import RenderField from '../../../components/ui/render-field';
import Icon from '../../../components/ui/icon';
import { User } from '../../../types/users';

type Props = {
  onClose: VoidFunction;
  header: string;
  data: User;
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
      <div className="flex flex-col gap-3">
        <div className="w-20 flex items-center justify-center aspect-square rounded-full bg-primary-foreground mx-auto">
          <Icon name="User" color="var(--primary)" />
        </div>
        <RenderField label="Name">{data.name}</RenderField>
        <RenderField label="Email">{data.email}</RenderField>
        <RenderField label="Phone">{data.phone}</RenderField>
        <RenderField label="Address">{data.address}</RenderField>
        <RenderField label="Books">
          <div className='flex items-center gap-2 flex-wrap'>
                      {data.borrowedBooks.map((el) => (
            <div className='tag text-sm text-nowrap'>{el.title}</div>
          ))}
          </div>
        </RenderField>
      </div>
    </DialogLayout>
  );
}

export default ViewDialog;
