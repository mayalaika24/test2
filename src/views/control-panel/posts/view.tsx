import DialogLayout from '../../../layouts/DialogLayout';
import { Button } from '../../../components/ui/button';
import { DialogClose } from '../../../components/ui/dialog';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { Post } from '../../../types/posts';
import RenderField from '../../../components/ui/render-field';
import Icon from '../../../components/ui/icon';

type Props = {
  onClose: VoidFunction;
  header: string;
  data: Post;
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
        <RenderField label="title">{data.title}</RenderField>
        <RenderField label="body">{data.body}</RenderField>
        <RenderField label="body">{data.body}</RenderField>
        <RenderField label="likes">
          <span className="flex items-center gap-1 text-green">
            {data.reactions.likes}
            <Icon name="Like1" color="var(--green)" size={20} />
          </span>
        </RenderField>
        <RenderField label="dislikes">
          <span className="flex items-center gap-1 text-red">
            {data.reactions.dislikes}
            <Icon name="Dislike" color="var(--red)" size={20} />
          </span>
        </RenderField>
        <RenderField label="dislikes">
          <div className="flex items-center gap-2">
            {data.tags.map((el, i) => {
              return (
                <div className="tag" key={i}>
                  {el}
                </div>
              );
            })}
          </div>
        </RenderField>
      </div>
    </DialogLayout>
  );
}

export default ViewDialog;
