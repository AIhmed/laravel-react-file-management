import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid/index.js";

export default function Create({ auth, pageTitle, pageDescription, pageData, formUrl }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: (pageData !== null) ? pageData.name : '',
    description: (pageData !== null) ? pageData.description : '',
  });

  useEffect(() => {
    return () => {
      reset('name', 'description');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route("folder.store"));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title={pageTitle} />
      <div className="m-5 p-5 flow-root shadow sm:rounded-lg">
        <div className="md:flex md:items-center md:justify-between border-b pb-3">
          {pageDescription !== '' ? (<>
            <p className="mt-2 text-3xl text-gray-700">
              {pageDescription}
            </p>
          </>) : ''}
          <Link
            href={route('folder.index')}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-150"
          >
            <XCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            Cancel
          </Link>
        </div>
        <form onSubmit={submit} className="space-y-6">

          <div className={`grid grid-cols-2 gap-4 py-4`}>
            <div>
              <InputLabel htmlFor="name" value="name"
                className="block text-sm font-medium leading-6 text-gray-900" />
              <div className="mt-2">
                <TextInput
                  id="name"
                  name="name"
                  type={'text'}
                  placeholder={'Enter name'}
                  value={data.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  autoComplete="name"
                  isFocused={true}
                  onChange={(e) => setData('name', e.target.value)}
                />
              </div>
              <InputError message={errors.name} className="mt-2" />
            </div>
            <div>
              <InputLabel htmlFor="description" value="description"
                className="block text-sm font-medium leading-6 text-gray-900" />
              <div className="mt-2">
                <TextInput
                  id="description"
                  name="description"
                  type={'textarea'}
                  placeholder={'Add a description'}
                  value={data.description}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  autoComplete="description"
                  onChange={(e) => setData('description', e.target.value)}
                />
              </div>
              <InputError message={errors.description} className="mt-2" />
            </div>
          </div>

          <div className="flex items-center justify-end align-middle gap-2 pt-3 border-t">
            <PrimaryButton
              className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={processing}>
              Submit
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
