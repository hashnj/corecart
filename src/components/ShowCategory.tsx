import {  useState } from "react";
import { useRecoilState,  useRecoilValueLoadable } from "recoil";
import { X } from "lucide-react";
import { categories } from "../store/products";
import { EditC } from "../store/edit";
import { edit, Show } from "../store/visible";
import { EditItem } from "./forms/Edit";
import { FaEdit } from "react-icons/fa";
import { CategoryEditState, CategoryResponse } from "@/types";




const TableHeader: React.FC<{ showCategories: boolean }> = ({ showCategories }) => (
  <tr>
    <th className="border-r border-text/40 border-b">S.no.</th>
    <th className="border-r px-2 border-b border-text/40">
      {showCategories ? "Category" : "Category"}
    </th>
    {!showCategories && (
      <th className="px-2 border-b border-r border-text/40">SubCategory</th>
    )}
    <th className="border-r px-2 border-b border-text/40">Description</th>
    <th className="border-b px-2 border-text/40">Edit</th>
  </tr>
);

const CategoryToggle: React.FC<{
  showCategories: boolean;
  onToggle: () => void;
}> = ({ showCategories, onToggle }) => (
  <div className="flex text-2xl mb-4 h-12 w-full justify-center items-center">
    See: &nbsp;
    <button
      className={`${
        showCategories
          ? "text-text underline bg-primary/70 p-2 rounded"
          : "text-text/70"
      } transition-all duration-300`}
      onClick={onToggle}
    >
      Categories
    </button>
    &nbsp; / &nbsp;
    <button
      className={`transition-all duration-300 ${
        showCategories
          ? "text-text/70"
          : "text-text underline bg-primary/70 p-2 rounded"
      }`}
      onClick={onToggle}
    >
      Sub-Categories
    </button>
  </div>
);

export const ShowCategories: React.FC = () => {
  const [showCategories, setShowCategories] = useState(true);
  const categoryLoadable = useRecoilValueLoadable(categories);
  const [, setEditCategory] = useRecoilState(EditC);
  const [showEdit, setShowEdit] = useRecoilState(edit);
  const [_showModal, setShowModal] = useRecoilState(Show);


  const handleEditCategory = (data: CategoryEditState) => {
    setEditCategory(data);
    setShowEdit(true);
  };

  if (categoryLoadable.state === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (categoryLoadable.state === "hasError") {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading categories
      </div>
    );
  }

  const data = categoryLoadable.contents as CategoryResponse;

  return (
    <div className="absolute z-10 cursor-default text-text top-0 p-36 w-screen h-screen flex justify-center items-center backdrop-blur-sm">
      {showEdit && (
        <div className="min-h-screen min-w-screen w-full h-full">
          <div
            className="z-20 w-screen h-screen"
            onClick={() => setShowEdit(false)}
          />
          <EditItem />
        </div>
      )}
      
      <div className="bg-background border-2 border-text/10 absolute rounded-lg w-4/5 lg:w-3/5 h-4/5 overflow-hidden">
        <div className="text-2xl p-4 flex justify-between font-semibold border-b-2 border-text/10">
          <h2 className="w-full text-3xl">Categories Available</h2>
          <button
            className="cursor-pointer text-text/80 hover:text-text active:text-text/50 hover:bg-text/20 rounded p-2"
            onClick={() => setShowModal(false)}
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="h-4/5 w-full p-4 scroll-smooth no-scrool overflow-scroll">
          <CategoryToggle
            showCategories={showCategories}
            onToggle={() => setShowCategories((prev) => !prev)}
          />

          <table className="w-full transition-all duration-500">
            <thead className="text-2xl">
              <TableHeader showCategories={showCategories} />
            </thead>
            <tbody className="text-lg">
              {showCategories
                ? data.categories.map((category, index) => (
                    <tr key={category._id}>
                      <td className="border-r border-b p-2 border-text/40 text-center">
                        {index + 1}.
                      </td>
                      <td className="border-r border-b border-text/40 text-center">
                        {category.name}
                      </td>
                      <td className="text-center border-r border-b border-text/40">
                        {category.description}
                      </td>
                      <td className="text-center border-b border-text/40">
                        <button
                          className="bg-primary size-6 mx-auto cursor-pointer rounded flex items-center justify-center"
                          onClick={() =>
                            handleEditCategory({
                              name: category.name,
                              description: category.description,
                              isSubCategory: false,
                              parent: "",
                              cat_img: category.cat_img || "" 
                            })
                          }
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                : data.subCategories.map((subCategory, index) => (
                    <tr key={subCategory._id}>
                      <td className="text-center border-b p-2 border-r border-text/40">
                        {index + 1}.
                      </td>
                      <td className="text-center border-r border-b border-text/40">
                        {data.categories.find(
                          (cat) => cat._id === subCategory.parent_id
                        )?.name}
                      </td>
                      <td className="text-center border-r border-b border-text/40">
                        {subCategory.name}
                      </td>
                      <td className="text-center border-b border-r border-text/40">
                        {subCategory.description}
                      </td>
                      <td className="text-center border-b border-text/40">
                        <button
                          className="bg-primary rounded size-6 cursor-pointer mx-auto flex items-center justify-center"
                          onClick={() =>
                            handleEditCategory({
                              name: subCategory.name,
                              description: subCategory.description,
                              isSubCategory: true,
                              parent: data.categories.find((cat) => cat._id === subCategory.parent_id)?.name || "",
                              cat_img: subCategory.cat_img || ""
                            })
                          }
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};