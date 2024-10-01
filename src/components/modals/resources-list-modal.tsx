import { ModalProps, ResourceList } from "@/types";
import { formatDate } from "@/utils";
import Link from "next/link";
import { FC } from "react";
import ReactDOM from "react-dom";
import { GiCancel } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";

interface ResourceListModalProps extends ModalProps {
  title: string;
  resourseList: ResourceList[];
}

export const ResourcesListModal: FC<ResourceListModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  resourseList,
}) => {
  function handleModalClose() {
    setIsOpen(false);
  }

  if (!isOpen) return null;

  console.log("resourseList", resourseList);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[70] flex h-screen w-full items-center justify-center bg-black/80 px-[5%] backdrop-blur-md">
      <div className="w-full max-w-[500px] rounded-[26px] bg-[#272727] px-[22px] py-[22px]">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-center text-base font-semibold">{title}</h1>
          <GiCancel
            size={18}
            color="white"
            onClick={handleModalClose}
            className="cursor-pointer"
          />
        </div>

        <div className="h-full max-h-[70vh] space-y-2 overflow-y-auto">
          {resourseList.map((resource, index) => (
            <ResourcesItem
              key={resource.id}
              label={resource.name}
              time={formatDate(resource.last_modified).formattedDate}
              url={resource.url}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

interface ResourcesItemProps {
  url: string;
  label: string;
  time: string;
}

const ResourcesItem: FC<ResourcesItemProps> = ({ url, label, time }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex items-center rounded-[4px] bg-[#464646] px-3 py-2"
    >
      <IoDocumentTextOutline size={18} color="#3EB2FF" />

      <div className="ml-[6px] flex w-full items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-white">
          <p className="text-[10px] font-medium">{label}</p>
          <p className="text-[8px] font-medium">{time}</p>
        </div>
        <MdOpenInNew size={20} color="#878787" className="flex shrink-0" />
      </div>
    </Link>
  );
};
