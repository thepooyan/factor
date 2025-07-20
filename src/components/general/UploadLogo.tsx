import { Accessor, createEffect, createSignal } from "solid-js";
import { Button } from "../ui/button";
import { FiUpload } from "solid-icons/fi";
import Input from "./Input";
import { Label } from "../ui/label";
import { api } from "~/utility/api";
import { callModal } from "../modal/Modal";
import { ICompany } from "~/utility/interface";
import { cn } from "~/lib/utils";
import Spinner from "./Spinner";
import { useInvalidate } from "~/utility/queries";

interface props {
  company: Accessor<ICompany>
}
const UploadLogo = ({company}:props) => {

  const [logoPreview, setLogoPreview] = createSignal<string | null>(null);
  const [uploading , setUploading] = createSignal(false)
  const invalidate = useInvalidate()

  const resetPreview = () => {
    if (company().company_logo_name === null) return setLogoPreview(null)
    setLogoPreview(`${import.meta.env.VITE_API}/logos/${company().company_id}/${company().company_logo_name}?date=${Date.now()}`)
  }

  const remove = () => {
    callModal.prompt("حذف شود؟")
    .yes(async () => {
        setUploading(true)
        await api.delete(`/company/DeleteCompanyLogo/${company().company_id}`)
        .catch(err => callModal.fail(err))
        setUploading(false)
        invalidate(k => k.companies)
      })
  }

  createEffect(() => {
    resetPreview()
  })

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
  setUploading(true)

  api.post(`/company/UploadCompanyLogo/${company().company_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(() => {
    callModal.success("لوگو جدید با موفقیت ثبت شد!")
    invalidate(k => k.companies)
    resetPreview()
  })
  .catch(e => {
    callModal.fail(e.msg)
    resetPreview()
  })
  .finally(() => {
    setUploading(false)
  })
}

  return (
    <div class="flex flex-col items-center gap-4">
      {logoPreview() ? (
        <div class="relative w-32 h-32">
          <img
            src={ logoPreview() || "/placeholder.png"}
            alt="پیش نمایش لوگو"
            class={cn("w-full h-full object-contain", uploading() && "opacity-30")}
          />
          {uploading() && <div class="bg-black w-full h-full top-0 absolute left-0 opacity-50 rounded flex justify-center"><Spinner reverse/></div> }
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="absolute -top-2 -right-2 bg-red-400 hover:bg-red-500 w-5 h-5 flex justify-center items-center p-0 !text-white font-bold"
            onClick={remove}
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
