// pages/posts/fetch.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { postsService } from '../../../services/PostsService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../../../schema/posts';
import { PostPayload } from '../../../types/posts';
import { toast } from 'sonner';
import { useState } from 'react';
import { LIMIT } from '../../../constants';
import useQueryClientUtils from '../../../custom-hooks/useQueryClientUtils';

function useFetch() {
  const [page, setPage] = useState(1);
  const cashTrigger = useQueryClientUtils('post');
  const skip = (page - 1) * LIMIT;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => postsService.getPosts(skip, LIMIT),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PostPayload) => postsService.createPost(data),
    onSuccess: async () => {
      await cashTrigger();
      toast.success('Post added successfully');
    },
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: ({ data, id }: { data: PostPayload; id: number }) =>
      postsService.updatePost(data, id),

    onSuccess: async () => {
      await cashTrigger();
      toast.success('Post updated successfully');
    },
  });

  const { mutate: deleteMutate, isPending: isPendingDelete } = useMutation({
    mutationFn: (id: number) => postsService.deletePost(id),
    onSuccess: async () => {
      await cashTrigger();
      toast.success('Post deleted successfully');
    },
  });

  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / LIMIT);

  return {
    data,
    error,
    isLoading,
    isError,
    mutate,
    isPending,
    handleSubmit,
    register,
    errors,
    page,
    setPage,
    totalPages,
    totalItems,
    deleteMutate,
    isPendingDelete,
    updateMutate,
    isUpdatePending
  };
}

export default useFetch;
