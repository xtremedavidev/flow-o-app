"use client";

import { ModalInput } from "@/components";
import { useUserStore } from "@/managers";
import { updateUserSettingsObj } from "@/server";
import Image from "next/image";
import { FC, useState } from "react";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";

interface FormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  companyLocation: string;
}

interface NotifItem {
  name: string;
  label: string;
  value: boolean;
}

interface Section {
  section: string;
  items: NotifItem[];
}

const DashboardSettings = () => {
  const userData = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUser);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: userData?.first_name || "",
      lastName: userData?.last_name || "",
      companyName: userData?.companyName || "",
      companyLocation: userData?.companyLocation || "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(
    userData?.image || null
  );

  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();

    if (data.firstName) {
      formData.append("first_name", data.firstName);
    }
    if (data.lastName) {
      formData.append("last_name", data.lastName);
    }
    if (data.companyName) {
      formData.append("companyName", data.companyName);
    }
    if (data.companyLocation) {
      formData.append("companyLocation", data.companyLocation);
    }

    if (imagePreview) {
      formData.append("file", imagePreview);
    }

    await updateUserSettingsObj(formData)
      .then((res) => {
        console.log(`ressss`, res);

        if ("error" in res) {
          toast.error(res.error || "Failed to save changes, try again later.");
        } else {
          if (res.message === "success") {
            toast.success("Changes saved successfully");

            const updatedUserData = {
              ...(data.firstName && { first_name: data.firstName }),
              ...(data.lastName && { last_name: data.lastName }),
              ...(data.companyName && { companyName: data.companyName }),
              ...(data.companyLocation && {
                companyLocation: data.companyLocation,
              }),
              ...(imagePreview && { image: URL.createObjectURL(imagePreview) }),
            };

            if (userData !== null) {
              setUserData({ ...userData, ...updatedUserData });
            }
          }
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold">My Profile</h1>

      <div className="mt-8">
        <div className="rounded-[10px] bg-[#1A1D1F]">
          <Image
            width={300}
            height={180}
            alt="profile bg"
            src="/images/settings-profile-bg.png"
            className="h-[100px] w-full object-cover object-center lg:h-auto"
          />

          <div className="px-6 py-8 lg:flex">
            <div className="relative flex min-w-[150px] shrink-0">
              <ProfileImageUpload
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                initialImageUrl={initialImageUrl}
                clearInitialImageUrl={() => setInitialImageUrl(null)}
              />
            </div>

            <div className="mt-20 flex w-full items-center justify-between lg:mt-0">
              <div className="space-y-[14px]">
                <h3 className="text-xl font-medium">
                  {userData?.first_name} {userData?.last_name}
                </h3>
                <p className="text-sm font-light">{userData?.companyName}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="my-8 text-2xl font-semibold">General</h1>

          <div className="space-y-3 rounded-[10px] bg-[#1A1D1F] px-7 py-5">
            <h2 className="text-base font-semibold text-[#C0C0C0] lg:text-xl">
              User Details
            </h2>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {userDataFields.map((field, idx) => (
                <ModalInput
                  className={` ${idx === 0 || idx === 1 ? "col-span-1" : "col-span-2"}`}
                  key={field.name}
                  name={field.name as Path<FormValues>}
                  control={control}
                  type={field.type}
                  label={field.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? "animate-pulse" : ""} my-8 flex w-full items-center justify-center rounded-xl bg-[#499BFC] py-[10.5px] text-base font-normal text-white`}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};
export default DashboardSettings;

interface ProfileImageUploadProps {
  setImagePreview: (image: File | null) => void;
  imagePreview: File | null;
  initialImageUrl: string | null;
  clearInitialImageUrl: () => void;
}

const ProfileImageUpload: FC<ProfileImageUploadProps> = ({
  setImagePreview,
  imagePreview,
  initialImageUrl,
  clearInitialImageUrl,
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(file);
      clearInitialImageUrl();
    }
  };

  return (
    <div className="absolute top-0 -translate-y-1/2 cursor-pointer">
      <div className="relative h-[120px] w-[120px]">
        <label htmlFor="file-input">
          <div className="relative flex aspect-square h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full">
            <Image
              width={120}
              height={120}
              src={
                imagePreview
                  ? URL.createObjectURL(imagePreview)
                  : initialImageUrl || "/images/placeholder-profile-pic.png"
                // imagePreview
                //   ? URL.createObjectURL(imagePreview)
                //   : "/images/placeholder-profile-pic.png"
              }
              alt="Profile pic"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute left-1/2 top-1/2 z-[10] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center">
              <div>
                <FiCamera size={32} color="#626262" />
              </div>
            </div>
          </div>
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

const userDataFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "companyName", label: "Company Name", type: "text" },
  { name: "companyLocation", label: "Company Location", type: "text" },
];

// const notifItemsArr = [
//   {
//     section: "Choose Notification Types",
//     items: [
//       {
//         name: "operational-suggestions",
//         label: "Operational Suggestions",
//         value: false,
//       },
//       {
//         name: "critical",
//         label: "Critical",
//         value: false,
//       },
//       {
//         name: "warning",
//         label: "Warning",
//         value: false,
//       },
//     ],
//   },
//   {
//     section: "Alert Mode",
//     items: [
//       {
//         name: "escalate-alerts",
//         label: "Escalate alerts",
//         value: false,
//       },
//       {
//         name: "turn-on-email-alerts",
//         label: "Turn on email alerts",
//         value: false,
//       },
//     ],
//   },
//   {
//     section: "Accessibility",
//     items: [
//       {
//         name: "read-out-mode",
//         label: "Read out mode",
//         value: false,
//       },
//     ],
//   },
// ];

// // Notifications -- removed

//  const handleToggle = (sectionIndex: number, itemIndex: number) => {
//    const newNotifItemsArr = notifItemsArr.map((section, sIndex) => {
//      if (sIndex === sectionIndex) {
//        const updatedItems = section.items.map((item, iIndex) => {
//          if (iIndex === itemIndex) {
//            return { ...item, value: !item.value };
//          }
//          return item;
//        });
//        return { ...section, items: updatedItems };
//      }
//      return section;
//    });

//    setNotifItemsArr(newNotifItemsArr);
//  };

//  const notifItems = notifItemsArr.map((section) => section.items);
//  const notifItemsData = notifItems.flat();

//  const updatedNotifData = notifItemsData.reduce(
//    (acc, item) => {
//      acc[item.name] = item.value;
//      return acc;
//    },
//    {} as Record<string, boolean>
//  );

// const [notifItemsArr, setNotifItemsArr] = useState<Section[]>([
//   {
//     section: "Choose Notification Types",
//     items: [
//       {
//         name: "operational-suggestions",
//         label: "Operational Suggestions",
//         value: false,
//       },
//       {
//         name: "critical",
//         label: "Critical",
//         value: false,
//       },
//       {
//         name: "warning",
//         label: "Warning",
//         value: false,
//       },
//     ],
//   },
//   {
//     section: "Alert Mode",
//     items: [
//       {
//         name: "escalate-alerts",
//         label: "Escalate alerts",
//         value: false,
//       },
//       {
//         name: "turn-on-email-alerts",
//         label: "Turn on email alerts",
//         value: false,
//       },
//     ],
//   },
//   {
//     section: "Accessibility",
//     items: [
//       {
//         name: "read-out-mode",
//         label: "Read out mode",
//         value: false,
//       },
//     ],
//   },
// ]);

//  <div>
//    <h1 className="my-8 text-2xl font-semibold">Notifications</h1>

//    <div className="rounded-[10px] bg-[#1A1D1F] px-7 py-5">
//      {notifItemsArr.map((notifItem, sectionIndex) => (
//        <div
//          key={notifItem.section}
//          className={`${sectionIndex === 0 ? "" : "mt-5"}`}
//        >
//          <h3 className="text-base font-semibold text-[#C0C0C0] lg:text-xl">
//            {notifItem.section}
//          </h3>

//          <div className="mt-5 space-y-5">
//            {notifItem.items.map((item, itemIndex) => (
//              <div
//                key={item.name}
//                className="flex items-center justify-between gap-4"
//              >
//                <h3 className="text-sm lg:text-base">{item.label}</h3>
//                <ToggleSwitch
//                  isOn={item.value}
//                  onToggle={() => handleToggle(sectionIndex, itemIndex)}
//                />
//              </div>
//            ))}
//          </div>
//        </div>
//      ))}
//    </div>
//  </div>;
