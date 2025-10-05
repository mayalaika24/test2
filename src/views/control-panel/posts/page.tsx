import TableLayout from '../../../layouts/TableLayout';
import { DataTable } from '../../../components/tables/DataTable';
import useColumns from './columns';
import useFetch from './fetch';
import useLocalTranslation from '../../../custom-hooks/useLocalTranslation';
import { Temp } from '../../../types';
import { Post } from '../../../types/posts';
import Dialog from './dialog';
import useTempItem from '../../../custom-hooks/useTempItem';
import useToggleBoolean from '../../../custom-hooks/useToggleBoolean';
import TableHeader from '../../../components/tables/table-header';
import { Button } from '../../../components/ui/button';
import DeleteDialog from '../../../components/dialogs/shared/DeleteDialog';
import ViewDialog from './view';
function Page() {
  const { t } = useLocalTranslation();
  const columns = useColumns();
  const {
    data,
    isLoading,
    isError,
    error,
    page,
    setPage,
    totalPages,
    totalItems,
    deleteMutate,
    isPendingDelete,
  } = useFetch();
  const { value, handleSetValue } = useToggleBoolean();
  const { value: isDelete, handleSetValue: handleSetIsDelete } =
    useToggleBoolean();
  const { value: isView, handleSetValue: handleSetIsView } = useToggleBoolean();
  const { temp, handleSetTemp } = useTempItem<Post>();
  const handleAction = (payload: Temp<Post>) => {
    handleSetTemp(payload);
    if (payload.action === 'update') {
      handleSetValue(true);
    } else if (payload.action === 'delete') {
      handleSetIsDelete(true);
    } else if (payload.action === 'view') {
      handleSetIsView(true);
    }
  };
  const handleClose = () => {
    handleSetValue(false);
    handleSetIsDelete(false);
    handleSetIsView(false);
    handleSetTemp(null);
  };
  return (
    <TableLayout>
      <DataTable
        data={data?.posts || []}
        columns={columns}
        actions={['view', 'update', 'delete']}
        onAction={(val) => handleAction(val)}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message || t('error_message')}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setPage}
      >
        <TableHeader title="posts">
          <Button onClick={() => handleSetValue(true)}>
            {t('create_post')}
          </Button>
        </TableHeader>
      </DataTable>
      {value && (
        <Dialog post={temp?.data} onClose={handleClose} header={temp?.action || 'create'} />
      )}
      {isDelete && temp && (
        <DeleteDialog
          loading={isPendingDelete}
          onSubmit={() => deleteMutate(temp.data.id)}
          onClose={handleClose}
          header={'post'}
        >
          {temp.data.title}
        </DeleteDialog>
      )}
      {isView && temp && (
        <ViewDialog
          header={t('post')}
          data={temp.data}
          onClose={handleClose}
        ></ViewDialog>
      )}
    </TableLayout>
  );
}

export default Page;
