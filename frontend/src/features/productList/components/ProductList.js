import React, { useState,Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link, Navigate } from 'react-router-dom';
import { fetchAllProductsAsync, fetchBrandsAsync, fetchCategoriesAsync, fetchProductsByFiltersAsync, selectAllProducts, selectBrands, selectCategories, selectProductstatus, selectTotalItems } from '../productSlice';
import { ITEM_PER_PAGE } from '../../../app/constants';
import { fetchLoggedInUserAsync, selectUserChecked, selectUserInfo } from '../../user/userSlice';
import { TailSpin } from 'react-loader-spinner';

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
  const user = useSelector(selectUserInfo)
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
  const totalItems = useSelector(selectTotalItems)
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

function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen,handleFilter,filters}) {
  
  return ( 
  <div>
     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onClick={e=>handleFilter(e,section,option)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
  </div> );
}

function DesktopFilter({handleFilter,filters},) {
  return ( 
    <form className="hidden lg:block ">
                <h3 className="sr-only">Categories</h3>
              

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={e=>handleFilter(e,section,option)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
 );
}

function Pagination({handlePage,page,setPage,totalItems}) {
  return ( 
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page-1)*ITEM_PER_PAGE+1}</span> to <span className="font-medium">{Math.min(page * ITEM_PER_PAGE, totalItems)}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              onClick={e=>(handlePage(page-1))}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {Array.from({length:Math.ceil(totalItems/ITEM_PER_PAGE)}).map((el,index)=>(
               <div
              onClick={e=>handlePage(index+1)}
               aria-current="page"
               className="relative z-10 inline-flex items-cente border border-gray-300 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               {index+1}
             </div>
            ))}
           
            <a
              onClick={e=>(handlePage(page+1))}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>

      </div>
  </div> );
}

function ProductGrid({products}) {
  const liststatus = useSelector(selectProductstatus)
  return ( 
      <div className="lg:col-span-3">
                {/*This is our product list*/}
                <div className="bg-white">
                  <div className="mx-auto -mt-12 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                
                  <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {liststatus==='loading'?<TailSpin
            visible={true}
            className="flex items-center justify-center h-screen"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
  />:null}
                  {products.map((product) => (
                    
                    <Link to={`/product-detail/${product.id}`}>
                    <div key={product.id} className="group relative border-solid border-2 border-gray-300 p-2">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <div href={product.href}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.title}
                            </div>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                          {product.rating}
                            <StarIcon className='w-5 h-5 inline -mt-1.5 ml-0.5 '></StarIcon>
                            </p>
                        </div>
                        <div>
                        <p className="text-sm font-medium text-gray-600">${product.price}</p>
                        </div>
                        
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
            </div>
              </div>
           </div>
   );
}

