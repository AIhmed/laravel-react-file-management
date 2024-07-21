import { Head, Link } from '@inertiajs/react';
import { XCircleIcon } from "@heroicons/react/20/solid/index.js";
import { PlusCircleIcon } from "@heroicons/react/20/solid/index.js";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import "@/Styles/customSweetAlertStyles.css";

export default function Index({ auth, files, getFiles, filter, pageTitle, pageDescription }) {
  const actionUrls = {
    createRouteName: 'file.create',
    createEditName: 'file.edit',
    removeRouteName: 'file.destroy',
    editRouteName: 'file.edit'
  }
  const destroyFile = (e, file) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let data = await axios.delete(route("file.destroy", file.id))
            .then((response) => response.data.files)
            .catch((error) => {
              throw error;
            });
          getFiles(data);

          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Record has been removed successfully',
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          });
        } catch (error) {
          Swal.fire({
            toast: true,
            timer: 2500,
            icon: "success",
            position: "top-right",
            title: "Accord supprimé",
            showConfirmButton: false,
            timerProgressBar: true,
          });
        }
      }
    });
  };
  useEffect(() => { console.log(files.data) });
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
                      destroyFile(e, file);
                    }}
                  >
                    <XCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Remove
                  </button>
                  <Link
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    href={route("file.edit", file.id)}>
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
  );
}
