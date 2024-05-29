import { Search, Loader2 as Spinner, X } from 'lucide-react';
import Image from 'next/image';
import { PropsWithChildren, useRef, useState } from 'react';

import { Button } from '@bigcommerce/components/button';
import { Field, FieldControl, Form } from '@bigcommerce/components/form';
import { Input, InputIcon } from '@bigcommerce/components/input';

import { getQuickSearchResults } from '~/client/queries/get-quick-search-results';
import { ExistingResultType } from '~/client/util';

import { Pricing } from '../../pricing';

type SearchResults = ExistingResultType<typeof getQuickSearchResults>;

interface SearchProps extends PropsWithChildren {
  pending: boolean;
  searchResults: SearchResults | null;
  query: string;
  onQueryChange: (query: string) => void;
}

export const BaseQuickSearch = ({
  children,
  searchResults,
  query,
  onQueryChange,
  pending = false,
}: SearchProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQueryChange = (e: React.FormEvent<HTMLInputElement>) => {
    onQueryChange(e.currentTarget.value);
  };

  const handleClearQuery = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="grid items-center">
        <Form
          action="/search"
          className="col-span-4 flex lg:col-span-3"
          method="get"
          role="search"
        >
          <Field className="w-full" name="term">
            <FieldControl asChild required>
              <Input
                aria-controls="categories products brands"
                aria-expanded={!!searchResults}
                className="peer appearance-none border-2 px-12 py-2 lg:min-w-96"
                onChange={handleQueryChange}
                placeholder="Search..."
                ref={inputRef}
                role="combobox"
                value={query}
              >
                <InputIcon className="start-3 peer-hover:text-blue-primary peer-focus:text-blue-primary">
                  <Search />
                </InputIcon>
                {query.length > 0 && !pending && (
                  <Button
                    aria-label="Clear search"
                    className="absolute end-1.5 top-1/2 w-auto -translate-y-1/2 border-0 bg-transparent p-1.5 text-black hover:bg-transparent hover:text-blue-primary focus:text-blue-primary peer-hover:text-blue-primary peer-focus:text-blue-primary"
                    onClick={handleClearQuery}
                    type="button"
                  >
                    <X />
                  </Button>
                )}
                {pending && (
                  <InputIcon className="end-3 text-blue-primary">
                    <Spinner aria-hidden="true" className="animate-spin" />
                    <span className="sr-only">Processing...</span>
                  </InputIcon>
                )}
              </Input>
            </FieldControl>
          </Field>
        </Form>
      </div>
      {searchResults && searchResults.products.length > 0 && (
        <div className="mt-8 md:mt-4 overflow-auto px-1 bg-white w-full md:fixed z-10 right-0 shadow-md">
          <div className="grid lg:grid-cols-3 lg:gap-6 2xl:container 2xl:mx-auto 2xl:py-5 px-6 sm:px-10 lg:px-12 2xl:px-0">
            <section>
              <h3 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold lg:text-2xl">
                Categories
              </h3>
              <ul id="categories" role="listbox">
                {Object.entries(
                  searchResults.products.reduce<Record<string, string>>((categories, product) => {
                    product.categories.edges?.forEach((category) => {
                      if (category) {
                        categories[category.node.name] = category.node.path;
                      }
                    });

                    return categories;
                  }, {}),
                ).map(([name, path]) => {
                  return (
                    <li className="mb-3 last:mb-6" key={name}>
                      <a
                        className="focus:ring-primary-blue/20 align-items mb-6 flex gap-x-6 focus:outline-none focus:ring-4"
                        href={path}
                      >
                        {name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section>
              <h3 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold lg:text-2xl">
                Products
              </h3>
              <ul id="products" role="listbox">
                {searchResults.products.map((product) => {
                  return (
                    <li key={product.entityId}>
                      <a
                        className="focus:ring-primary-blue/20 align-items mb-6 flex gap-x-6 focus:outline-none focus:ring-4"
                        href={product.path}
                      >
                        {product.defaultImage ? (
                          <Image
                            alt={product.defaultImage.altText}
                            className="self-start object-contain"
                            height={80}
                            src={product.defaultImage.url}
                            width={80}
                          />
                        ) : (
                          <span className="flex h-20 w-20 flex-shrink-0 items-center justify-center bg-gray-200 text-lg font-bold text-gray-500">
                            Photo
                          </span>
                        )}

                        <span className="flex flex-col">
                          <p className="text-lg font-bold lg:text-2xl">{product.name}</p>
                          <Pricing prices={product.prices} />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section>
              <h3 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold lg:text-2xl">
                Brands
              </h3>
              <ul id="brands" role="listbox">
                {Object.entries(
                  searchResults.products.reduce<Record<string, string>>((brands, product) => {
                    if (product.brand) {
                      brands[product.brand.name] = product.brand.path;
                    }

                    return brands;
                  }, {}),
                ).map(([name, path]) => {
                  return (
                    <li className="mb-3 last:mb-6" key={name}>
                      <a
                        className="focus:ring-primary-blue/20 align-items mb-6 flex gap-x-6 focus:outline-none focus:ring-4"
                        href={path}
                      >
                        {name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      )}
      {searchResults && searchResults.products.length === 0 && (
        <p className="pt-6 md:fixed">
          No products matched with <b>"{query}"</b>
        </p>
      )}
    </>
  );
};
