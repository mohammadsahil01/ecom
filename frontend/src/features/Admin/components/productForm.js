
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { selectBrands, selectCategories } from '../../productList/productSlice'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

export default function ProductForm() {
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
  return (
    <form onSubmit={handleSubmit((data)=>(
        console.log(data)
    ))} className=''>
      <div className="space-y-12 bg-white p-5 -mt-6'">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>

        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  {...register("title",{ required:'title is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  {...register("description",{ required:'description is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
               rating
              </label>
              <div className="mt-2">
                <input
                  id="rating"
                  {...register("rating",{ required:'rating is required' })}
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <input
                  id="country"
                  {...register("country",{ required:'country is required' })}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
                  
                
              </div>
            </div>

           
            <div
            className="text-gray-500">
                <label htmlFor="password" className="text-sm font-medium leading-6 text-black">Brand
            </label>

            <select 
            id='brand'
            {...register("brand",{ required:'brand is required' })}
            className="inline mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            {brands.map(brand=>(
            <option value={brand.label}>{brand.label}</option>
            ))}
        
            </select>
            </div>

            <div
            className="text-gray-500">
            <label htmlFor="password" className="text-sm font-medium leading-6 text-black">Brand
            </label>

            <select 
            id='category'
            {...register("category",{ required:'category is required' })}
            className="inline mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            {categories.map(category=>(
            <option value={category.value}>{category.label}</option>
            ))}
        
            </select>
            </div>

          

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("thumbnail",{ required:'thumbnail is required' })}
                  id="thumbnail"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Images
              </label>
              <div className="mt-2">
                <input
                  type="text"
                 
                  id="images"
                  {...register("images",{ required:'images is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
