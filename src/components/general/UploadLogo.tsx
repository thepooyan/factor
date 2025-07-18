import { createSignal } from "solid-js";
import { Button } from "../ui/button";
import { FiUpload } from "solid-icons/fi";
import Input from "./Input";
import { Label } from "../ui/label";
import { api } from "~/utility/api";
import { callModal } from "../modal/Modal";
import { useQueryClient } from "@tanstack/solid-query";
import { userMg } from "~/utility/signals";

interface props {
  companyId: number
  initial?: string
}
const UploadLogo = ({companyId, initial}:props) => {

  const [logoPreview, setLogoPreview] = createSignal<string | null>(initial || null);
  const qc = useQueryClient()

  const handleLogoChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadFile(file)
      setLogoPreview(URL.createObjectURL(file));
    }
  };

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  api.post(`/company/UploadCompanyLogo/${companyId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(() => {
    callModal.success("لوگو جدید با موفقیت ثبت شد!")
    qc.invalidateQueries({queryKey: ["companies", userMg.get()?.user.email]})
  })
  .catch(e => {
    callModal.fail(e.msg)
    setLogoPreview(initial || null)
  })
}

  return (
    <div class="flex flex-col items-center gap-4">
      {logoPreview() ? (
        <div class="relative w-32 h-32">
          <img
            src={ import.meta.env.VITE_API + logoPreview() || "/placeholder.png"}
            alt="پیش نمایش لوگو"
            class="w-full h-full object-contain"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="absolute -top-2 -right-2 bg-red-400 hover:bg-red-500 w-5 h-5 flex justify-center items-center p-0 !text-white font-bold"
            onClick={() => {
              setLogoPreview(null);
            }}
          >
            ×
          </Button>
        </div>
      ) : (
        <div class="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-md border-gray-300">
          <FiUpload class="w-8 h-8 text-gray-400" />
          <span class="mt-2 text-sm text-gray-500">آپلود لوگو</span>
        </div>
      )}
      <div class="w-full">
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          class="hidden"
        />
        <Label
          for="logo"
          class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer"
        >
          <FiUpload class="w-4 h-4 ml-2" />
          انتخاب فایل
        </Label>
      </div>
    </div>
  );
};

export default UploadLogo;
