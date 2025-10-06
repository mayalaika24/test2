import { useState, useEffect } from 'react';
import useFetch from '../../../custom-hooks/useFetch';
import TableLayout from '../../../layouts/TableLayout';
import { DataTable } from '../../../components/tables/DataTable';
import useColumns from './columns';
import useToggleBoolean from '../../../custom-hooks/useToggleBoolean';
import useTempItem from '../../../custom-hooks/useTempItem';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import TableHeader from '../../../components/tables/table-header';
import ViewDialog from './view';
import { Button } from '../../../components/ui/button';
import Dialog from './dialog';
import { Temp } from '../../../types';
import { Book } from '../../../types/books';
import DeleteDialog from '../../../components/dialogs/shared/DeleteDialog';
import { booksService } from '../../../services/BooksService';
import { toast } from 'sonner';

function BooksPage() {
  const { data: fetchedBooks, loading, error } = useFetch('books');
  const [books, setBooks] = useState<Book[]>([]);
  const columns = useColumns();
  const { t } = useLocalTranslation();
  const { value, handleSetValue } = useToggleBoolean();
  const { value: isDelete, handleSetValue: handleSetIsDelete } =
    useToggleBoolean();
  const { value: isView, handleSetValue: handleSetIsView } = useToggleBoolean();
  const { temp, handleSetTemp } = useTempItem<Book>();

  useEffect(() => {
    if (fetchedBooks) setBooks(fetchedBooks);
  }, [fetchedBooks]);

  const handleAction = (payload: Temp<Book>) => {
    handleSetTemp(payload);
    if (payload.action === 'update') handleSetValue(true);
    else if (payload.action === 'delete') handleSetIsDelete(true);
    else if (payload.action === 'view') handleSetIsView(true);
  };

  const handleClose = () => {
    handleSetValue(false);
    handleSetIsDelete(false);
    handleSetIsView(false);
    handleSetTemp(null);
  };

  const handleSuccess = (payload: Book) => {
    setBooks((prev) => {
      const index = prev.findIndex((el) => el.id === payload.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = payload;
        return updated;
      }
      return [...prev, payload];
    });
    handleClose();
  };
  const handleDelete = (data: Book) => {
    booksService.deleteBook(data.id);
    setBooks(prevState => prevState.filter(el => el.id !== data.id));
    toast.success('book deleted successfully')
    handleClose();
  }
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableLayout>
      <DataTable
        data={books || []}
        columns={columns}
        actions={['view', 'update', 'delete']}
        onAction={(val) => handleAction(val)}
      >
        <TableHeader title="books">
          <Button onClick={() => handleSetValue(true)}>
            {t('create_book')}
          </Button>
        </TableHeader>
      </DataTable>

      {value && (
        <Dialog
          length={books?.length || 2}
          passedData={temp?.data}
          onClose={handleClose}
          onSuccess={handleSuccess}
          header={`${t(temp?.action || 'create')} ${t('book')}`}
        />
      )}

      {isView && temp && (
        <ViewDialog header={temp.data.title} data={temp.data} onClose={handleClose} />
      )}
      {
        isDelete && temp && (
          <DeleteDialog onClose={handleClose} header={'book'} onSubmit={() => handleDelete(temp.data)}>
            {temp.data.title}
          </DeleteDialog>
        )
      }
    </TableLayout>
  );
}

export default BooksPage;
