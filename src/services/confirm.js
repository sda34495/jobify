import { confirm } from "react-confirm-box";

export default async function confirmBox(message) {
  const result = await confirm(message, {
    classNames: {
      buttons: "flex justify-center mt-4 space-x-4",
      cancelButton:
        "px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded",
      confirmButton:
        "px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded",
      container: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",
    },
  });

  return result;
}
