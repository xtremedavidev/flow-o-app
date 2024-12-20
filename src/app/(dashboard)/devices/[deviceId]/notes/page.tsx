import { createNote, getNotes } from "@/server";
import { NotesPrompt } from "@/components";
import { decryptToken } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { FC } from "react";

interface NotesPageProps {
  params: {
    deviceId: string;
  };
}

const NotesPage: FC<NotesPageProps> = async ({ params }) => {
  const deviceId = decryptToken(decodeURIComponent(params.deviceId));

  const notesData = await getNotes(deviceId);

  const handleCreatNote = async (text: string, deviceID: string) => {
    "use server";
    const res = await createNote(text, deviceID);
    // revalidateTag("getNotesTag");
    revalidatePath("/devices/[deviceId]/notes", "page");
    return res;
  };

  console.log("erere", deviceId, notesData);

  if (notesData.error) {
    return <div>{notesData.error}</div>;
  }

  return (
    <div className="flex h-full max-h-full flex-col justify-between overflow-hidden">
      <div className="my-3">
        <h2 className="text-sm font-medium text-[#717579]">Notes</h2>
      </div>

      <div className="h-full max-h-[calc(100%-130px)] space-y-4 overflow-y-auto pr-2">
        {"error" in notesData
          ? null
          : notesData.data.notes
              .reverse()
              .map((note) => (
                <NotesItem
                  key={note.id}
                  username={`${note.user.first_name} ${note.user.last_name}`}
                  comment={note.note}
                />
              ))}
      </div>

      <NotesPrompt handlePrompt={handleCreatNote} deviceID={deviceId} />
    </div>
  );
};

export default NotesPage;

interface NotesItemProps {
  username: string;
  comment: string;
}

const NotesItem: FC<NotesItemProps> = ({ username, comment }) => {
  return (
    <div className="w-full space-y-3 rounded-xl bg-[#CDEBFF]/[0.07] px-5 py-[15px]">
      <h2 className="text-sm font-semibold text-[#F1F1F1]">{username}</h2>
      <p className="text-xs font-semibold text-[#F1F1F1]">{comment}</p>
    </div>
  );
};
