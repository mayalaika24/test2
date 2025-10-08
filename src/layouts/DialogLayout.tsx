import React, { useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { ClassNameType, DialogLayoutType } from '../types';
import useLocalTranslation from '../custom-hooks/useLocalTranslation';
import { cn } from '../lib/utils';
import useToggleBoolean from '../custom-hooks/useToggleBoolean';
import useEffectOnUpdate from '../custom-hooks/useEffectOnUpdate';
import Icon from '../components/ui/icon';
const DialogLayout: React.FC<
  DialogLayoutType &
    ClassNameType & {
      defaultValue?: boolean;
      onClose: VoidFunction;
      closeTrigger?: number;
      mini?: boolean;
    }
> = ({
  header,
  children,
  footer,
  trigger,
  className = '',
  defaultValue = true,
  onClose,
  closeTrigger = 1,
  mini = true,
}) => {
  const { t } = useLocalTranslation();
  const { value: isOpen, handleToggle: setIsOpen } =
    useToggleBoolean(defaultValue);
  useEffect(() => {
    let close: NodeJS.Timeout;
    if (!isOpen) {
      close = setTimeout(() => {
        onClose();
      }, 300);
    }
    return () => {
      if (close) clearTimeout(close);
    };
  }, [isOpen]);
  const handleClose = () => {
    setIsOpen();
  };
  useEffectOnUpdate(() => {
    handleClose();
  }, [closeTrigger]);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          'max-h-[90vh] w-[90%] overflow-hidden dark:bg-dark-500 dark:text-white',
          mini ? 'max-w-[450px]' : 'max-w-[910px]',
          className
        )}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            {header}
          </DialogTitle>
          <DialogClose>
            <Icon name="CloseCircle" />
          </DialogClose>
        </DialogHeader>
        <DialogDescription
          className="pe-1 overflow-y-auto"
          style={{ maxHeight: 'calc(90vh - 150px)' }}
          asChild
        >
          <div>{children}</div>
        </DialogDescription>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogLayout;
