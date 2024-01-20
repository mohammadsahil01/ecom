import { useSelector } from "react-redux";
import { selectProductstatus } from "../productSlice";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

export function ProductGrid({ products }) {
    const liststatus = useSelector(selectProductstatus);
  
    return (
      <div className="lg:col-span-3">
        {/* This is our product list */}
        <div className="bg-white">
          <div className="mx-auto -mt-12 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {liststatus === 'loading' ? (
              <div className="flex items-center justify-center h-screen">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <Link to={`/product-detail/${product.id}`} key={product.id}>
                    <div className="group relative border-solid border-2 border-gray-300 p-2">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          loading="lazy"
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
                            {/* Assuming StarIcon is a component or an SVG for rendering stars */}
                            {/* Replace it with your actual StarIcon component */}
                            {/* <StarIcon className="w-5 h-5 inline -mt-1.5 ml-0.5" /> */}
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
            )}
          </div>
        </div>
      </div>
    );
  }
  