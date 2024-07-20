import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid/index.js";
import Modal from '@/Components/Modal';
import { PlusCircleIcon } from "@heroicons/react/20/solid/index.js";
import FileIndex from "@/Pages/Document/File/Index.jsx";
import FileCreate from "@/Pages/Document/File/Create.jsx";

export default function Create({ auth, folder, pageTitle, pageDescription, formUrl }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: "put",
    name: (folder !== null) ? folder.name : '',
    description: (folder !== null) ? folder.description : '',
  });
  const [popModal, setPopModal] = useState(false);
  const [files, setFiles] = useState(folder.files);
  const reloadFiles = (value) => {
    setFiles(value);
    setPopModal(false);
  }
  const closeModal = () => {
    setPopModal(false);
  };


  const submit = (e) => {
    e.preventDefault();
    post(route("folder.update", folder));
  };
  useEffect(() => {
    return () => {
      reset('name', 'description');
    };
  }, []);
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
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
          <div className="flex flex-col gap-4 md:pr-3 md:border-r-2">
            <form onSubmit={submit} className="space-y-6">
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

              <div className="flex items-center justify-center align-middle gap-2 pt-3 border-t">
                <PrimaryButton
                  className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={processing}>
                  Submit
                </PrimaryButton>
              </div>
            </form>
          </div>
          <div className="m-5 p-5 flow-root shadow sm:rounded-lg">
            <div className="flex justify-between">
              <p className="mt-2 text-3xl text-gray-700">
                List of files
              </p>
              <button
                onClick={() => setPopModal(!popModal)}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-150"
              >
                <PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                Add
              </button>
            </div>
            <hr className="mt-2" />
            <FileIndex files={files} pageTitle="List of files" pageDescription="List of files" />
          </div>
        </div>
      </div>

      <Modal show={popModal} onClose={closeModal}>
        <FileCreate folder={folder} pageDescription="Create a new file" pageTitle="Create a new file" pageData={null} auth={auth} getFiles={reloadFiles} />
      </Modal>
    </AuthenticatedLayout>
  );
}
