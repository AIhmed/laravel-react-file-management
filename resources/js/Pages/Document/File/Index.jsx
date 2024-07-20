import { XCircleIcon } from "@heroicons/react/20/solid/index.js";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "@/Styles/customSweetAlertStyles.css";
import Modal from '@/Components/Modal';
import { useForm } from "@inertiajs/react";

export default function Index({ files, getFiles }) {
  const { data, setData, processing, errors, reset } = useForm({
    _method: "put",
    folder_id: null,
    name: null,
    description: null,
    path: null,
  });
  const [popModal, setPopModal] = useState(false);
  const closeModal = () => {
    setPopModal(false);
  };

  const edit = (file) => {
    setPopModal(true);
    setData("folder_id", file.folder_id);
    setData("name", file.name);
    setData("description", file.description);
    setData("path", file.path);
  }
  const update = async (e, file) => {
    e.preventDefault();
    try {
      let res = await axios.post(route("file.udpate", file.id), data, {
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

    const destroy = (e, file) => {
      e.preventDefault();
      Swal.fire({
        title: 'Remove record, Are you sure?',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes sure',
        denyButtonText: `Not right now`,
        allowOutsideClick: false,
        customClass: {
          confirmButton: 'swal2-confirm',
          denyButton: 'swal2-deny'
        }
      }).then((result) => {
        if (result.isConfirmed) {

          destroy(route("file.destroy", file.id), {
            preserveScroll: true,
            onSuccess: () => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Record has been removed successfully',
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false,
              })
            },
            onFinish: () => {

            }
          });
        } else if (result.isDenied) {
          Swal.fire('Record is safe', '', 'info')
        }
      })
    };

    useEffect(() => {
      return () => {
        reset('name', 'description', 'path');
      };
    }, []);

    return (
      <div className="mt-8 flow-root">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left border border-gray-300">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left border border-gray-300">Description</th>
              <th className="py-2 px-4 bg-gray-200 text-left border border-gray-300 w-[200px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <>
                <tr key={file.id} className="border-t border-gray-300">
                  <td className="py-2 px-4 border">{file.name}</td>
                  <td className="py-2 px-4 border">{file.description}</td>
                  <td className="text-sm text-gray-500 flex justify-center gap-2" key={file.id}>
                    <button
                      type={"button"}
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      onClick={(e) => {
                        e.preventDefault();
                        destroy(e, file);
                      }}
                    >
                      <XCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                      Remove
                    </button>
                    <button
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                      href={route("file.edit", file.id)}
                      onClick={edit(file)}
                    >
                      <PencilSquareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                      Edit
                    </button>
                  </td>

                </tr>
              </>
            ))}
          </tbody>
        </table >
        <Modal show={popModal} onClose={closeModal}>
          <div className="m-5 p-5 flow-root shadow sm:rounded-lg">
            <form onSubmit={update} className="space-y-6">

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
        </Modal>
      </div>
    );
  }
}
