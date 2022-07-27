import React from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { appConfig } from "~/config";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { ProjectCard } from "./ProjectCard";

export const ProjectQuickView = ({ id }: { id?: number }) => {
  const { isLoading, isSuccess, data, isError } = useQuery(
    ["project-quickview", id],
    async ({ signal }: QueryFunctionContext) => {
      return fetch(`${appConfig.cmsUrl}/map/detail/${id}`, {
        // Pass the signal to one fetch
        signal,
      }).then(async (response) => await response.json());
    }
  );

  if (!id || isError) return <></>;

  return (
    <>
      {isLoading && <LoadingBar isLoading={isLoading} />}

      {isSuccess && data?.data?.id && (
        <ProjectCard view="quickview" slug={data?.data?.slug} data={data?.data?.acf?.details} />        
      )}
    </>
  );
};
