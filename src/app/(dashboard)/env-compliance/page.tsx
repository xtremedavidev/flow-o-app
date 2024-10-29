import { getEnvTopicsTags } from "@/server";
import {
  BackBtnWithText,
  EnvComplianceInfo,
  EnvCompSelectTags,
} from "@/components";

const EnvCompliance = async () => {
  const envTopicsAndTags = await getEnvTopicsTags();

  if ("error" in envTopicsAndTags) {
    return (
      <div className="flex w-full justify-center text-center text-base font-medium text-white">
        Failed to get Environmental and Regulatory compliance tags
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <BackBtnWithText text="AI Regulatory" />
      </div>
      <div className="flex h-full max-h-full w-full flex-col-reverse gap-[10px] overflow-hidden lg:flex-row">
        <EnvComplianceInfo envTopicsAndTags={envTopicsAndTags} />
        <EnvCompSelectTags envTopicsAndTags={envTopicsAndTags} />
      </div>
    </div>
  );
};

export default EnvCompliance;
