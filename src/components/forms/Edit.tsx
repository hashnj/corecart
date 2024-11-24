import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EditC, EditV } from '@/store/edit';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import CustomInput from '@/components/CustomInput'; 
import axiosInstance from '@/lib/axiosInstance'; 

export const EditItem = () => {
  const [itemType, setItemType] = useState('product');
  const [eitem, setEItem] = useRecoilState(EditV);
  const [itemC, setItemC] = useRecoilState(EditC);

  const form = useForm({
    defaultValues: {
      category: '',
      name: '',
      description: '',
      mrp: 0,
      price: 0,
      stock: 0,
      image: '',
      isSubCategory: false,
      cat_img: '',
      parent: '',
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  useEffect(() => {
    if (itemC.name) {
      setItemType('category');
      setValue('category', itemC.name);
      setValue('cat_img', itemC.cat_img);
      setValue('description', itemC.description);
      setValue('isSubCategory', itemC.isSubCategory);
    } else {
      setItemType('product');
      setValue('category', eitem.category);
      setValue('name', eitem.name);
      setValue('description', eitem.description);
      setValue('mrp', eitem.mrp);
      setValue('price', eitem.price);
      setValue('stock', eitem.stock);
      setValue('image', eitem.image);
    }
  }, [itemC, eitem, setValue]);

  const handleItemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemType(e.target.value);
  };

  const onSubmit = async (data: any) => {
    const endpoint = itemType === 'product' ? '/products' : '/categories';
    try {
      const req = await axiosInstance.put(
        endpoint,
        itemType === 'product' ? data : { item: data, itemC }
      );
      const responseData = req.data;
      console.log(responseData);
      if (responseData.message === 'updated') {
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex text-text justify-center min-h-screen ">
      <FormProvider {...form}>
        <form
          className="max-w-md w-full space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-2 pb-0">
            <div className="text-2xl text-primary font-bold">
              Edit {itemType === 'product' ? 'Product' : 'Category'}
            </div>
            <div className="flex items-center p-1">
              <label className="mr-4">Select Item Type:</label>
              <select
                value={itemType}
                onChange={handleItemTypeChange}
                className="border-text/5 text-xl bg-backgrounds/50 rounded"
              >
                <option value="product">Product</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          {itemType === 'product' && (
            <>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Category"
                    placeholder="Enter category"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Product Name"
                    placeholder="Enter product name"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Description"
                    placeholder="Enter description"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="mrp"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="MRP"
                    placeholder="Enter MRP"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Price"
                    placeholder="Enter price"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="stock"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Stock"
                    placeholder="Enter stock"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Image URL"
                    placeholder="Enter image URL"
                    required
                  />
                )}
              />
            </>
          )}

          {itemType === 'category' && (
            <>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Category Name"
                    placeholder="Enter category name"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="cat_img"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    control={control}
                    label="Category Image"
                    placeholder="Enter image URL"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                control={control}

                    label="Description"
                    placeholder="Enter description"
                    required
                  />
                )}
              />
              <div className="mb-4 ml-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={watch('isSubCategory')}
                    onChange={(e) =>
                      setValue('isSubCategory', e.target.checked)
                    }
                    className="text-primary"
                  />
                  <span className="ml-2">Is Sub-Category</span>
                </label>
              </div>
              {watch('isSubCategory') && (
                <Controller
                  control={control}
                  name="parent"
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                control={control}

                      label="Parent Category"
                      placeholder="Enter parent category"
                    />
                  )}
                />
              )}
            </>
          )}

          <button className="w-full p-2 bg-primary rounded-lg" type="submit">
            Edit {itemType === 'product' ? 'Product' : 'Category'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditItem;
