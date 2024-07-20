import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid/index.js";
import Swal from 'sweetalert2';

export default function Create({ folder, pageData, getFiles }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    folder_id: folder.id,
    name: (pageData !== null) ? pageData.name : '',
    description: (pageData !== null) ? pageData.description : '',
    path: (pageData !== null) ? pageData.path : '',
  });

  useEffect(() => {
    return () => {
      reset('name', 'description', 'path');
    };
  }, []);

  const store = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(route("file.store"), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getFiles(res.data.files);
    } catch (error) {
      let err = error.response.data.errors;
      errors.name =
        err.name != undefined ? err.name[0] : undefined;
      errors.description =
        err.description != undefined ? err.description[0] : undefined;
      errors.path =
        err.path != undefined ? err.path[0] : undefined;
    }
  };
  return (
    <div className="m-5 p-5 flow-root shadow sm:rounded-lg">
      <form onSubmit={store} className="space-y-6">

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
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload file
            </label>
            <input
              type="file"
              onChange={(e) => setData('path', e.target.files[0])}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
            <InputError message={errors.path} className="mt-2" />
          </div>
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
  );
}
