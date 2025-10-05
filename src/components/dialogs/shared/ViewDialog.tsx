import DialogLayout from '../../../layouts/DialogLayout';
import Button from '../../buttons/Button';
import { DialogClose } from '../../ui/dialog';
import RenderField from '../../ui/render-field';

type Props<T extends Record<string, unknown>> = {
  onClose: VoidFunction;
  header: string;
  data: T;
};

function ViewDialog<T extends Record<string, unknown>>({
  onClose,
  data,
  header,
}: Props<T>) {
  return (
    <DialogLayout
      header={header}
      onClose={onClose}
      footer={
        <DialogClose asChild>
          <Button text="cancel" primary={false} secondary={true} />
        </DialogClose>
      }
    >
      <div className="flex flex-col gap-3">
        {Object.entries(data).map(([key, value], i) => (
          <RenderField key={i} label={key}>
            <span>
              {Array.isArray(value)
                ? value.join(', ')
                : typeof value === 'object' && value !== null
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
            </span>
          </RenderField>
        ))}
      </div>
    </DialogLayout>
  );
}

export default ViewDialog;
