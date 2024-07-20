import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { XCircleIcon } from "@heroicons/react/20/solid/index.js";
import { PlusCircleIcon } from "@heroicons/react/20/solid/index.js";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import "@/Styles/customSweetAlertStyles.css";

export default function Index({ auth, folders, pageTitle, pageDescription }) {
  const destroy = (e, folder) => {
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

        destroy(route("folder.destroy", folder.id), {
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
  useEffect(() => { console.log(folders.data) });
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title={pageTitle} />

      <div className="m-5 p-5 flow-root shadow sm:rounded-lg">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-3xl text-gray-700">
              {pageDescription}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={route("folder.create")}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-150"
            >
              <PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
              Add
            </Link>
          </div>
        </div>
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
              {folders.map(folder => (
                <>
                  <tr key={folder.id} className="border-t border-gray-300">
                    <td className="py-2 px-4 border">{folder.name}</td>
                    <td className="py-2 px-4 border">{folder.description}</td>
                    <td className="text-sm text-gray-500 flex justify-center gap-2" key={folder.id}>
                      <button
                        type={"button"}
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          destroy(e, folder);
                        }}
                      >
                        <XCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        Remove
                      </button>
                      <Link
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        href={route("folder.edit", folder.id)}>
                        <PencilSquareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        Edit
                      </Link>
                    </td>

                  </tr>
                </>
              ))}
            </tbody>
          </table >

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
