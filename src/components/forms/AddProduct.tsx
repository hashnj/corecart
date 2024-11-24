import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPlus } from 'react-icons/fa';
import { useRecoilValueLoadable } from 'recoil';
import { categories } from '@/store/products';
import { toast } from 'react-toastify';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/CustomInput';
import axiosInstance from '@/lib/axiosInstance';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';




const productFormSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    mrp: z.number().positive('MRP must be positive'),
    price: z.number().positive('Price must be positive'),
    stock: z.number().nonnegative('Stock cannot be negative'),
    image: z.string().url('Must be a valid URL'),
    category: z.string().min(1, 'Category is required'),
    orderSizes: z.array(z.string()).nonempty('Order sizes cannot be empty'),
    dividingCriteria: z.array(z.object({
        key: z.string().min(1, 'Key is required'),
        values: z.array(z.string()).nonempty('Values cannot be empty'),
    })).nonempty('Dividing criteria cannot be empty'), 
});


type ProductFormData = z.infer<typeof productFormSchema>;

const AddProduct = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isVisible, setIsVisible] = useState(true);

  const categoryState = useRecoilValueLoadable(categories);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      category: '',
        name: '',
        description: '',
        mrp: 0,
        price: 0,
        stock: 0,
        image: '',
        orderSizes: [],
        dividingCriteria: [],
    },
  });

  const { handleSubmit } = form;

  // const closeForm = () => setIsVisible(false);

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/products/add', data, {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      });

      if (response.status === 201) {
        toast.success('Product added successfully!');
        form.reset();
        // closeForm();
        location.reload();
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      toast.error('Error adding product.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (!isVisible) return null;

  return (
    <div className="min-h-screen flex py-4 justify-center text-text">
      <Form {...form}>
        <form
          className="max-w-md w-full space-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          <h2 className="text-2xl font-bold text-primary">Add New Product</h2>
          

          
            <CustomInput
              control={form.control}
              name="name"
              label="Product Name"
              placeholder="Enter product name"
            />
            <CustomInput
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter description"
            />
            <div className="flex gap-2">
              <CustomInput
                control={form.control}
                name="mrp"
                label="MRP"
                placeholder="Enter MRP"
              />
              <CustomInput
                control={form.control}
                name="price"
                label="Price"
                placeholder="Enter price"
              />
            </div>
            <CustomInput
              control={form.control}
              name="stock"
              label="Stock"
              placeholder="Enter stock quantity"
            />
            <CustomInput
              control={form.control}
              name="image"
              label="Image URL"
              placeholder="Enter image URL"
            />

            <select
              className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
              {...form.register('category')}
              required
            > 
              <option value="">Select Category</option>
            {categoryState.state === 'hasValue' ? (
              <>
              {categoryState.contents.categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              {categoryState.contents.subCategories.map((subCat) => (
                <option key={subCat.id} value={subCat.name}>
                  {subCat.name}
                </option>
              ))}
            </>):(<option>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading Categories...
                    </option>)}
            </select>
            <CustomInput
              control={form.control}
              name="orderSizes"
              label="Order Sizes"
              placeholder="Ex: 1kg , 1 unit, pack of 12,etc"
            />
            <CustomInput
              control={form.control}
              name="dividingCriteria"
              label="Dividing Criteria"
              placeholder="Ex: color,sizes, etc"
            />

            <button
              type="submit"
              className="w-full bg-primary text-text py-2 mt-2 flex items-center justify-center rounded hover:bg-primary/90 active:ring-2 active:ring-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-spin mr-2">⏳</span>
              ) : (
                <FaPlus className="mr-2" />
              )}
              {isSubmitting ? 'Submitting...' : 'Add Product'}
            </button>
          
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;
