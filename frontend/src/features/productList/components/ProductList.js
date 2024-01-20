import React, { useState,Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchAllProductsAsync, fetchBrandsAsync, fetchCategoriesAsync, fetchProductsByFiltersAsync, selectAllProducts, selectBrands, selectCategories, selectProductstatus, selectTotalItems } from '../productSlice';
import { ITEM_PER_PAGE } from '../../../app/constants';
import { fetchLoggedInUserAsync, selectUserChecked, selectUserInfo } from '../../user/userSlice';
import { TailSpin } from 'react-loader-spinner';
import { selectLoggedUser } from '../../auth/authSlice';
import { DesktopFilter } from './DeskFilter';
import { MobileFilter } from './MobileFilter';
import { Pagination } from './pagination';
import { ProductGrid } from './ProductGrid';

const sortOptions = [
  { name: 'Best Rating',sort:'rating',order:'desc', current: false },
  { name: 'Price: Low to High',sort:'price',order:'asc', current: false },
  { name: 'Price: High to Low', sort: 'price',order:'desc',
   current: false },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter,setFilter]=useState({})
  const [sort,setSort]=useState({})
  const dispatch = useDispatch();
  const [page,setPage]=useState(1)
  const categories = useSelector(selectCategories)
  const brands = useSelector(selectBrands)
  const userInfo = useSelector(selectUserInfo)
  const user  =  useSelector(selectLoggedUser)
  const totalItems = useSelector(selectTotalItems)

  const filters = [
    {
      id: 'brand',
      name: 'Brands',
      options: brands
      ,
    },
    {
      id: 'category',
      name: 'Category',
      options: categories
      
    },
    
  ]
  

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };
  

  const handleSort=(e,option)=>{
    const sort = {_sort:option.sort,_order:option.order}
    setSort(sort)
    console.log(sort)
    
  }

  const handlePage =(page)=>{
    console.log({page})
    setPage(page)
  }
  const products = useSelector(selectAllProducts)

  useEffect(()=>{
    dispatch(fetchBrandsAsync())
    dispatch(fetchCategoriesAsync())
  },[])

  useEffect(()=>{
    const pagination = {_page:page,_limit:ITEM_PER_PAGE}
    dispatch(fetchProductsByFiltersAsync({filter,sort,pagination}))
  },[dispatch,sort,filter,page])

  useEffect(()=>{
    setPage(1)
  },[totalItems,sort])
  
  
  

  return (
    <>
      {!user && <Navigate to='/login' replace={true}></Navigate>}
      <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
      <MobileFilter
       handleFilter={handleFilter} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}
       filters={filters}
       ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between pb-3 pt-20">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              href={option.href}
                              onClick={e=>handleSort(e,option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

             
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 ">
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-4 ">
              {/* Filters */}
              <div className='lg:col-span-1 pt-6'>
              <DesktopFilter handleFilter={handleFilter}
              filters={filters}
              ></DesktopFilter>
              </div>
              

              {/* Product grid */}
              <ProductGrid products={products}></ProductGrid>
            </div>
          </section>
          
              <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems}></Pagination>
       </main>
      </div>
    </div>

      
    </>
  );
}







