import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '@/components/CustomInput';
import { Form } from '@/components/ui/form';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

const categoryFormSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().min(1, 'Description is required'),
  cat_img: z.string().url('Must be a valid URL'),
  parent: z.string().optional(),
  isSubCategory: z.boolean().optional(),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

const AddCategory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      cat_img: '',
      parent: '',
      isSubCategory: false,
    },
  });

  const { handleSubmit, watch } = form;

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/categories', data);

      if (response.status === 201) {
        toast.success('Category added successfully!');
        form.reset();
      } else {
        throw new Error('Failed to add category');
      }
    } catch (error) {
      toast.error('Error adding category.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  

  return (
    <div className=" flex items-center justify-center h-screen">
      <Form {...form}>
        <form
          className="max-w-md w-full space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='text-primary text-2xl font-bold'> Add Category</div>
          

          <CustomInput control={form.control} name="name" label="Category Name" placeholder="Enter Category Name" />
          <CustomInput control={form.control} name="cat_img" label="Category Image" placeholder="Enter Image URL" />
          <CustomInput control={form.control} name="description" label="Description" placeholder="Enter Description" />

          {watch('isSubCategory') && (
            <CustomInput
              control={form.control}
              name="parent"
              label="Parent Category"
              placeholder="Enter Parent Category"
            />
          )}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...form.register('isSubCategory')}
              className="mr-2"
            />
            <label>Is Sub-Category</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : (
              <FaPlus className="mr-2" />
            )}
            {isSubmitting ? 'Submitting...' : 'Add Category'}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default AddCategory;
