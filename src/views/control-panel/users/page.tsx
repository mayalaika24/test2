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
import DeleteDialog from '../../../components/dialogs/shared/DeleteDialog';
import { toast } from 'sonner';
import { User } from '../../../types/users';
import { usersService } from '../../../services/UsersService';
import BorrowDialog from './borrow';
import ReturnDialog from './return';

function BooksPage() {
  const {
    data: fetchUsers,
    loading,
    error,
    fetchData,
  } = useFetch(usersService);
  const [users, setUsers] = useState<User[]>([]);
  const columns = useColumns();
  const { t } = useLocalTranslation();
  const { value, handleSetValue } = useToggleBoolean();
  const { value: isDelete, handleSetValue: handleSetIsDelete } =
    useToggleBoolean();
  const { value: isView, handleSetValue: handleSetIsView } = useToggleBoolean();
  const { value: isReturn, handleSetValue: handleSetIsReturn } =
    useToggleBoolean();
  const { value: isBorrow, handleSetValue: handleSetIsBorrow } =
    useToggleBoolean();
  const { temp, handleSetTemp } = useTempItem<User>();

  useEffect(() => {
    if (fetchUsers) setUsers(fetchUsers);
  }, [fetchUsers]);

  const handleAction = (payload: Temp<User>) => {
    handleSetTemp(payload);
    if (payload.action === 'Edit') handleSetValue(true);
    else if (payload.action === 'Trash') handleSetIsDelete(true);
    else if (payload.action === 'Eye') handleSetIsView(true);
    else if (payload.action === 'Book') handleSetIsBorrow(true);
    else if (payload.action === 'Back') handleSetIsReturn(true);
  };

  const handleClose = () => {
    handleSetValue(false);
    handleSetIsDelete(false);
    handleSetIsView(false);
    handleSetIsBorrow(false);
    handleSetIsReturn(false);
    handleSetTemp(null);
  };

  // const handleSuccess = (payload: User) => {
  //   setUsers((prev) => {
  //     const index = prev.findIndex((el) => el.id === payload.id);
  //     if (index >= 0) {
  //       const updated = [...prev];
  //       updated[index] = payload;
  //       return updated;
  //     }
  //     return [...prev, payload];
  //   });
  //   handleClose();
  // };
  const handleDelete = (data: User) => {
    if (data.borrowedBooks.length) {
      toast.error(t('Cant delete user till return all books'));
      return;
    }
    usersService.deleteUser(data.id);
    setUsers((prevState) => prevState.filter((el) => el.id !== data.id));
    toast.success(t('User deleted successfully'));
    handleClose();
  };
  const handleSuccess = () => {
    fetchData();
    handleClose();
  };
  if (loading) return <p>{t('Loading')}...</p>;
  if (error)
    return (
      <p>
        {t('Error')}: {error}
      </p>
    );

  return (
    <TableLayout>
      <DataTable
        data={users || []}
        columns={columns}
        actions={['Eye', 'Edit', 'Book', 'Back', 'Trash']}
        onAction={(val) => handleAction(val)}
      >
        <TableHeader title="Users">
          <Button onClick={() => handleSetValue(true)}>
            {t('Create User')}
          </Button>
        </TableHeader>
      </DataTable>

      {value && (
        <Dialog
          length={users?.length || 2}
          passedData={temp?.data}
          onClose={handleClose}
          onSuccess={handleSuccess}
          header={`${t(temp?.action || 'create')} ${t('User')}`}
        />
      )}

      {isView && temp && (
        <ViewDialog
          header={temp.data.name}
          data={temp.data}
          onClose={handleClose}
        />
      )}
      {isDelete && temp && (
        <DeleteDialog
          onClose={handleClose}
          header={'User'}
          onSubmit={() => handleDelete(temp.data)}
        >
          {temp.data.name}
        </DeleteDialog>
      )}
      {isBorrow && temp && (
        <BorrowDialog
          onSuccess={handleSuccess}
          header="Borrow Book"
          onClose={handleClose}
          data={temp.data}
        />
      )}
      {isReturn && temp && (
        <ReturnDialog
          onSuccess={handleSuccess}
          header={t('Return Book')}
          onClose={handleClose}
          data={temp.data}
        />
      )}
    </TableLayout>
  );
}

export default BooksPage;
