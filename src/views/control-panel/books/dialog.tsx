import { Button } from '../../../components/ui/button';
import DialogLayout from '../../../layouts/DialogLayout';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import useTriggerValue from '../../../custom-hooks/useTriggerValue';
import { Book } from '../../../types/books';
import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Genre, VoidFun } from '../../../types';
import { formSchema, FormValues } from '../../../schema/books';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import Select from '../../../components/ui/select';
import { GENRE } from '../../../constants';
import { toast } from 'sonner';
import { booksService } from '../../../services/BooksService';
function Dialog({
  header,
  onClose,
  passedData = undefined,
  onSuccess
}: {
  passedData?: Book;
  header: string;
  onClose: VoidFunction;
  onSuccess: VoidFun<Book>;
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
      year: Number(data.year),
      pages: Number(data.pages),
      id: passedData ? passedData.id : uuidv4(),
      isBorrowed: passedData ? passedData.isBorrowed : false,
      borrowedBy: passedData ? passedData.borrowedBy : null,
      rating: passedData
        ? passedData.rating
        : Math.floor(Math.random() * 5) + 1,
    };
    if (passedData) {
      booksService.updateBook(passedData.id, payload);
    } else {
      booksService.addBook(payload);
    }
    onSuccess(payload);
    handleTriggerValue();
    toast.success('book added successfully');
  };
  useEffect(() => {
    if (passedData) {
      console.log(passedData);
      reset({
        title: passedData.title,
        publisher: passedData.publisher,
        author: passedData.author,
        genre: passedData.genre as Genre,
        pages: passedData.pages.toString(),
        year: passedData.year.toString(),
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
          {...register('title')}
          label="title"
          error={errors.title?.message}
        />
        <Input
          {...register('author')}
          label="author"
          error={errors.author?.message}
        />
        <Input
          {...register('publisher')}
          label="publisher"
          error={errors.publisher?.message}
        />
        <Select
          defaultValue={watch('genre')}
          label="genre"
          options={options}
          onSelect={(val) =>
            setValue('genre', val as Genre, { shouldValidate: true })
          }
          error={errors.genre?.message}
        />
        <Input
          type="number"
          {...register('pages')}
          label="pages"
          error={errors.pages?.message}
        />
        <Input
          {...register('year')}
          label="year"
          error={errors.year?.message}
        />
      </form>
    </DialogLayout>
  );
}

export default Dialog;
